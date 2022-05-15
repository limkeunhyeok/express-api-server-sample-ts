import { ObjectIdLike } from "bson";
import { model, Schema, Document, Model } from "mongoose";

export interface CommentInfo {
  content: string;
}

export interface Comment extends CommentInfo {
  userId: ObjectIdLike;
  postId: ObjectIdLike;
  createdAt: Date;
}

export interface ICommentDocument extends Comment, Document {}

export interface ICommentModel extends Model<ICommentDocument> {}

const commentSchema: Schema = new Schema<ICommentDocument, ICommentModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

export const CommentModel = model<ICommentDocument>(
  "comment",
  commentSchema
) as ICommentModel;

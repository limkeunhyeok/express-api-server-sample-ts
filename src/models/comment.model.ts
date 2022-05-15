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

export interface ICommentModel extends Model<ICommentDocument> {
  createComment: (
    this: ICommentModel,
    commentDoc: Partial<Comment>
  ) => Promise<void>;
  findByPostId: (
    this: ICommentModel,
    postId: string
  ) => Promise<ICommentDocument[]>;
  findByUserId: (
    this: ICommentModel,
    userId: string
  ) => Promise<ICommentDocument[]>;
  deleteOneByCommentId: (
    this: ICommentModel,
    commentId: string
  ) => Promise<ICommentDocument>;
}

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

commentSchema.statics.createComment = async function (
  commentDoc: Partial<Comment>
): Promise<void> {
  const now: Date = new Date();
  const comment: Comment = {
    content: commentDoc.content,
    userId: commentDoc.userId,
    postId: commentDoc.postId,
    createdAt: now,
  };
  await this.create(comment);
};

commentSchema.statics.findByPostId = async function (
  postId: string
): Promise<ICommentDocument[]> {
  const comments: ICommentDocument[] = await this.find({ postId });
  return comments;
};

commentSchema.statics.findByUserId = async function (
  userId: string
): Promise<ICommentDocument[]> {
  const comments: ICommentDocument[] = await this.find({ userId });
  return comments;
};

commentSchema.statics.deleteOneByCommentId = async function (
  commentId: string
): Promise<ICommentDocument> {
  const comment: ICommentDocument = await this.findByIdAndDelete(commentId);
  return comment;
};

export const CommentModel = model<ICommentDocument>(
  "Comment",
  commentSchema
) as ICommentModel;

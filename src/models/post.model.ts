import { ObjectIdLike } from "bson";
import { model, Schema, Document, Model } from "mongoose";

export interface PostInfo {
  title: string;
  content: string;
}

export interface Post extends PostInfo {
  userId: ObjectIdLike;
  categoryId: ObjectIdLike;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostDocument extends Post, Document {}

export interface IPostModel extends Model<IPostDocument> {}

const postSchema: Schema = new Schema<IPostDocument, IPostModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    title: {
      type: String,
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
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

export const PostModel = model<IPostDocument>("Post", postSchema) as IPostModel;

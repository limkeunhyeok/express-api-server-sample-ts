import { ObjectIdLike } from "bson";
import { DeleteResult } from "mongodb";
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

export interface IPostDocument extends Post, Document {
  updatePost: (this: IPostDocument, postInfo: Partial<Post>) => Promise<void>;
}

export interface IPostModel extends Model<IPostDocument> {
  createPost: (this: IPostModel, postDoc: Partial<Post>) => Promise<void>;
  findOneByPostId: (this: IPostModel, postId: string) => Promise<IPostDocument>;
  findByUserId: (this: IPostModel, userId: string) => Promise<IPostDocument[]>;
  findByCategoryId: (
    this: IPostModel,
    categoryId: string
  ) => Promise<IPostDocument[]>;
  findAll: (this: IPostModel) => Promise<IPostDocument[]>;
  deleteOneByPostId: (
    this: IPostModel,
    postId: string
  ) => Promise<IPostDocument>;
  deleteByCategoryId: (
    this: IPostModel,
    categoryId: string
  ) => Promise<DeleteResult>;
  deleteByUserId: (this: IPostModel, userId: string) => Promise<DeleteResult>;
}

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

postSchema.statics.createPost = async function (
  postDoc: Partial<Post>
): Promise<void> {
  const now: Date = new Date();
  const post: Post = {
    title: postDoc.title,
    content: postDoc.content,
    userId: postDoc.userId,
    categoryId: postDoc.categoryId,
    createdAt: now,
    updatedAt: now,
  };
  await this.create(post);
};

postSchema.statics.findOneByPostId = async function (
  postId: string
): Promise<IPostDocument> {
  const post: IPostDocument = await this.findOne({ _id: postId });
  return post;
};

postSchema.statics.findByUserId = async function (
  userId: string
): Promise<IPostDocument[]> {
  const posts: IPostDocument[] = await this.find({ userId });
  return posts;
};

postSchema.statics.findByCategoryId = async function (
  categoryId: string
): Promise<IPostDocument[]> {
  const posts: IPostDocument[] = await this.find({ categoryId });
  return posts;
};

postSchema.statics.findAll = async function (): Promise<IPostDocument[]> {
  const posts: IPostDocument[] = await this.find({});
  return posts;
};

postSchema.statics.deleteOneByPostId = async function (
  postId: string
): Promise<IPostDocument> {
  const post: IPostDocument = await this.findByIdAndDelete(postId);
  return post;
};

postSchema.statics.deleteByCategoryId = async function (
  categoryId: string
): Promise<DeleteResult> {
  const result: DeleteResult = await this.deleteMany({ categoryId });
  return result;
};

postSchema.statics.deleteByUserId = async function (
  userId: string
): Promise<DeleteResult> {
  const result: DeleteResult = await this.deleteMany({ userId });
  return result;
};

postSchema.methods.updatePost = async function (
  postInfo: Partial<Post>
): Promise<void> {
  const now: Date = new Date();

  this.title = postInfo.title;
  this.content = postInfo.content;
  this.updatedAt = now;

  await this.save();
};

export const PostModel = model<IPostDocument>("Post", postSchema) as IPostModel;

import { ObjectId } from "mongoose";

export interface Post {
  _id: ObjectId | string;
  userId: string;
  categoryId: string;
  title: string;
  slug: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
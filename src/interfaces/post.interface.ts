import { ObjectId } from "mongoose";

export interface Post {
  _id: ObjectId | string;
  userId: ObjectId | string;
  categoryId: ObjectId | string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
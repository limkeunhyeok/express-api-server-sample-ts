import { ObjectId } from "mongoose";

export interface Comment {
  _id: ObjectId | string;
  userId: ObjectId | string;
  postId: ObjectId | string;
  content: string;
  createdAt: string;
}
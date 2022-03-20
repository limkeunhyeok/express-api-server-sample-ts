import { ObjectId } from "mongoose";

export interface Comment {
  _id: ObjectId | string;
  userId: string;
  postId: string;
  content: string;
  createdAt: Date;
}
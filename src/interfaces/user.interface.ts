import { ObjectId } from "mongoose";

export interface User {
  _id: ObjectId | string;
  email: string;
  password: string;
  nick: string;
  createdAt: string;
  updatedAt: string;
}
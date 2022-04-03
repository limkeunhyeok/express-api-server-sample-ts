import { ObjectId } from "mongoose";
export interface Category {
    _id: ObjectId | string;
    title: string;
    createdAt: string;
}

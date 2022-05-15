import { model, Schema, Document, Model } from "mongoose";

export interface UserInfo {
  email: string;
  nick: string;
}

export interface User extends UserInfo {
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends User, Document {}

export interface IUserModel extends Model<IUserDocument> {}

const userSchema: Schema = new Schema<IUserDocument, IUserModel>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nick: {
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

export const UserModel = model<IUserDocument>("User", userSchema) as IUserModel;

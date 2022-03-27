import { model, Schema, Document } from "mongoose";
import { User } from "../interfaces";

const userSchema: Schema = new Schema({
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
  }
}, {
  versionKey: false,
});

const UserModel = model<User & Document>("User", userSchema);

export default UserModel;
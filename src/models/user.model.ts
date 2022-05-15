import { model, Schema, Document, Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { SALT_ROUND } from "../config";

export interface UserInfo {
  email: string;
  nick: string;
}

export interface User extends UserInfo {
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends User, Document {
  comparePassword: (this: IUserDocument, password: string) => Promise<boolean>;
  updateUser: (
    this: IUserDocument,
    userInfo: Partial<User>
  ) => Promise<IUserDocument>;
}

export interface IUserModel extends Model<IUserDocument> {
  createUser: (this: IUserModel, userDoc: Partial<User>) => Promise<void>;
  createAdmin: (this: IUserModel) => Promise<void>;
  findOneByUserId: (this: IUserModel, userId: string) => Promise<IUserDocument>;
  findOneByEmail: (this: IUserModel, email: string) => Promise<IUserDocument>;
  findAll: (this: IUserModel) => Promise<IUserDocument[]>;
  deleteOneByUserId: (
    this: IUserModel,
    userId: string
  ) => Promise<IUserDocument>;
}

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

userSchema.statics.createUser = async function (
  userDoc: Partial<User>
): Promise<void> {
  const now: Date = new Date();
  const encryptedPassword: string = bcrypt.hashSync(
    userDoc.password,
    Number(SALT_ROUND)
  );
  const user: User = {
    email: userDoc.email,
    nick: userDoc.nick,
    password: encryptedPassword,
    createdAt: now,
    updatedAt: now,
  };
  await this.create(user);
};

userSchema.statics.createAdmin = async function (): Promise<void> {
  const now: Date = new Date();
  const encryptedPassword: string = bcrypt.hashSync(
    "password",
    Number(SALT_ROUND)
  );
  const admin: User = {
    email: "admin",
    nick: "admin",
    password: encryptedPassword,
    createdAt: now,
    updatedAt: now,
  };
  await this.create(admin);
};

userSchema.statics.findOneByUserId = async function (
  userId: string
): Promise<IUserDocument> {
  const user: IUserDocument = await this.findOne({ _id: userId });
  return user;
};

userSchema.statics.findOneByEmail = async function (
  email: string
): Promise<IUserDocument> {
  const user: IUserDocument = await this.findOne({ email });
  return user;
};

userSchema.statics.findAll = async function (): Promise<IUserDocument[]> {
  const users: IUserDocument[] = await this.find({});
  return users;
};

userSchema.statics.deleteOneByUserId = async function (
  userId: string
): Promise<IUserDocument> {
  const user: IUserDocument = await this.findByIdAndDelete(userId);
  return user;
};

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const isMatch: boolean = await bcrypt.compare(password, this.password);
  return isMatch;
};

userSchema.methods.updateUser = async function (
  userInfo: Partial<User>
): Promise<void> {
  const now: Date = new Date();
  const encryptedPassword: string = bcrypt.hashSync(
    userInfo.password,
    Number(SALT_ROUND)
  );

  this.email = userInfo.email;
  this.nick = userInfo.nick;
  this.password = encryptedPassword;
  this.updatedAt = now;

  await this.save();
};

export const UserModel = model<IUserDocument>("User", userSchema) as IUserModel;

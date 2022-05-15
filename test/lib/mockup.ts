import * as faker from "faker";
import UserModel from "../../src/models/user.model";
import CategoryModel from "../../src/models/category.model";
import PostModel from "../../src/models/post.model";
import CommentModel from "../../src/models/comment.model";
import { User } from "../../src/interfaces/user.interface";
import { Category } from "../../src/interfaces/category.interface";
import { Post } from "../../src/interfaces/post.interface";
import { Comment } from "../../src/interfaces/comment.interface";
import { ObjectID } from "bson";
import { hashSync } from "bcrypt";

const userModel = UserModel;
const categoryModel = CategoryModel;
const postModel = PostModel;
const commentModel = CommentModel;

export function mockUserRaw(): User {
  const now = new Date().toISOString();
  return {
    _id: new ObjectID().toString(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    nick: faker.lorem.word(),
    createdAt: now,
    updatedAt: now,
  };
}

export async function createUser(userRaw: User = mockUserRaw()): Promise<User> {
  const data = JSON.parse(JSON.stringify(userRaw));
  data.password = hashSync(data.password, 10);
  const user = await userModel.create(data);
  return user;
}

export function mockCategoryRaw(): Category {
  const now = new Date().toISOString();
  return {
    _id: new ObjectID().toString(),
    title: faker.lorem.word(),
    createdAt: now,
  };
}

export async function createCategory(
  categoryRaw: Category = mockCategoryRaw()
): Promise<Category> {
  const data = JSON.parse(JSON.stringify(categoryRaw));
  const category = await categoryModel.create(data);
  return category;
}

export function mockPostRaw(user: User, category: Category): Post {
  const now = new Date().toISOString();
  return {
    _id: new ObjectID().toString(),
    userId: user._id,
    categoryId: category._id,
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    createdAt: now,
    updatedAt: now,
  };
}

export async function createPost(postRaw: Post): Promise<Post> {
  const data = JSON.parse(JSON.stringify(postRaw));
  const post = await postModel.create(data);
  return post;
}

export function mockCommentRaw(user: User, post: Post): Comment {
  const now = new Date().toISOString();
  return {
    _id: new ObjectID().toString(),
    userId: user._id,
    postId: post._id,
    content: faker.lorem.sentence(),
    createdAt: now,
  };
}

export async function createComment(commentRaw: Comment): Promise<Comment> {
  const data = JSON.parse(JSON.stringify(commentRaw));
  const comment = await commentModel.create(commentRaw);
  return comment;
}

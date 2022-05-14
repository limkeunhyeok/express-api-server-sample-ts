import shortid from "shortid";
import { CreatePostDto, UpdatePostDto } from "../dtos";
import { Post } from "../interfaces";
import { BadRequestException } from "../common/exceptions";
import PostModel from "../models/post.model";
import UserModel from "../models/user.model";
import CategoryModel from "../models/category.model";

export default class PostService {
  public Post = PostModel;
  public User = UserModel;
  public Category = CategoryModel;

  public async findAll(): Promise<Post[]> {
    const posts: Post[] = await this.Post.find({});
    return posts;
  }

  public async findAllByUserId(userId: string): Promise<Post[]> {
    const posts: Post[] = await this.Post.find({ userId });
    return posts;
  }

  public async findAllByCategoryId(categoryId: string): Promise<Post[]> {
    const posts: Post[] = await this.Post.find({ categoryId });
    return posts;
  }

  public async findOneByPostId(postId: string): Promise<Post> {
    const hasPost: Post = await this.Post.findOne({ _id: postId });
    if (!hasPost) throw new BadRequestException("Post does not exists.");
    return hasPost;
  }

  public async createPost(postData: CreatePostDto): Promise<Post> {
    const now = new Date().toISOString();

    const hasUser = await this.User.findById({ _id: postData.userId });
    if (!hasUser) throw new BadRequestException("User does not exists.");

    const hasCategory = await this.Category.findById({ _id: postData.categoryId });
    if (!hasCategory) throw new BadRequestException("Category does not exists.");

    const createdPostData: Post = await this.Post.create({
      ...postData,
      createdAt: now,
      updatedAt: now
    });
    return createdPostData;
  }

  public async updatePost(postId: string, postData: UpdatePostDto): Promise<Post> {
    const hasPost: Post = await this.Post.findOne({ _id: postId });
    if (!hasPost) throw new BadRequestException("Post does not exists.");

    const now = new Date().toISOString();
    const updatedPostData: Post = await this.Post.findByIdAndUpdate(postId, {
      ...postData,
      updatedAt: now
    }, {
      new: true
    });
    return updatedPostData;
  }

  public async deletePost(postId: string): Promise<Post> {
    const hasPost: Post = await this.Post.findOne({ _id: postId });
    if (!hasPost) throw new BadRequestException("Post does not exists.");

    const deletedPostData: Post = await this.Post.findByIdAndDelete(postId);
    return deletedPostData;
  }
}
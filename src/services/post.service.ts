import shortid from "shortid";
import { CreatePostDto, UpdatePostDto } from "../dtos/post.dto";
import { Post } from "../interfaces/post.interface";
import PostModel from "../models/post.model";
import { BadRequestException } from "../exceptions/bad-request.exception";

export default class PostService {
  public Post = PostModel;

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
    const post: Post = await this.Post.findOne({ _id: postId });
    return post;
  }
  
  public async findOneBySlug(slug: string): Promise<Post> {
    const post: Post = await this.Post.findOne({ slug });
    return post;
  }

  public async createPost(postData: CreatePostDto): Promise<Post> {
    const slug = `${postData.title.replace(/\s/gi, "-")}-${shortid.generate()}`;
    const now = new Date().toISOString();
    const createdPostData: Post = await this.Post.create({
      ...postData,
      slug,
      createdAt: now,
      updatedAt: now
    });
    return createdPostData;
  }

  public async updatePost(postId: string, postData: UpdatePostDto): Promise<Post> {
    const hasPost: Post = await this.Post.findOne({ _id: postId });
    if (!hasPost) throw new BadRequestException("Post does not exists.");

    const slug = `${postData.title.replace(/\s/gi, "-")}-${shortid.generate()}`;
    const now = new Date().toISOString();
    const updatedPostData: Post = await this.Post.findByIdAndUpdate(postId, {
      ...postData,
      slug,
      updatedAt: now
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
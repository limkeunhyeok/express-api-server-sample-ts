import { CreatePostDto, UpdatePostDto } from "../dtos/post.dto";
import { Post } from "../interfaces/post.interface";
import PostService from "../services/post.service";
import { Handler } from "express";

export default class PostController {
  public postService = new PostService();

  public findAll: Handler = async () => {
    const posts: Post[] = await this.postService.findAll();
    return posts;
  }

  public findAllByUserId: Handler = async (req) => {
    const userId: string = req.query.userId as any;
    const posts: Post[] = await this.postService.findAllByUserId(userId);
    return posts;
  }

  public findAllByCategoryId: Handler = async (req) => {
    const categoryId = req.query.categoryId as any;
    const posts: Post[] = await this.postService.findAllByCategoryId(categoryId);
    return posts;
  }

  public findOneByPostId: Handler = async (req) => {
    const postId: string = req.query.postId as any;
    const post: Post = await this.postService.findOneByPostId(postId);
    return post;
  }

  public findOneBySlug: Handler = async (req) => {
    const slug: string = req.params.slug;
    const post: Post = await this.postService.findOneBySlug(slug);
    return post;
  }

  public create: Handler = async (req) => {
    const params: CreatePostDto = { ...req.body };
    const post: Post = await this.postService.createPost(params);
    return post;
  }

  public update: Handler = async (req) => {
    const postId: string = req.query.postId as any;
    const params: UpdatePostDto = { ...req.body };
    const post: Post = await this.postService.updatePost(postId, params);
    return post;
  }

  public delete: Handler = async (req) => {
    const postId: string = req.query.postId as any;
    const post: Post = await this.postService.deletePost(postId);
    return post;
  }
}
import { CreatePostDto, UpdatePostDto } from "../dtos";
import { Post } from "../interfaces";
import PostService from "../services/post.service";
import { Handler } from "express";

export default class PostController {
  public postService = new PostService();

  public findAll: Handler = async () => {
    const posts: Post[] = await this.postService.findAll();
    return posts;
  };

  public findOneById: Handler = async (req) => {
    const postId: string = req.params.id;
    const post: Post = await this.postService.findOneByPostId(postId);
    return post;
  };

  public create: Handler = async (req) => {
    const params: CreatePostDto = { ...req.body };
    const post: Post = await this.postService.createPost(params);
    return post;
  };

  public update: Handler = async (req) => {
    const postId: string = req.params.id;
    const params: UpdatePostDto = { ...req.body };
    const post: Post = await this.postService.updatePost(postId, params);
    return post;
  };

  public delete: Handler = async (req) => {
    const postId: string = req.params.id;
    const post: Post = await this.postService.deletePost(postId);
    return post;
  };
}

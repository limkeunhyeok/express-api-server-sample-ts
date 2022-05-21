import { Controller } from "../../common/interfaces/controller.interface";
import { Handler, Router } from "express";
import { IPostDocument, PostModel } from "../../models/post.model";
import { UserModel } from "../../models/user.model";
import { CategoryModel } from "../../models/category.model";
import { PostService } from "./post.service"
import { wrap } from "../../lib/wrap";
import { CreatePostDto } from "./dto/create-post.dto";
import { ReadPostByPostIdDto } from "./dto/read-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { DeletePostByPostIdDto } from "./dto/delete-post.dto";

export default class PostController implements Controller {
  path = "/posts";
  router = Router();

  postService = new PostService(PostModel, UserModel, CategoryModel);

  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes() {
    const router = Router();

    router
      .post('/', wrap(this.createPost))
      .get('/', wrap(this.findAll))
      .get('/:postId', wrap(this.findOneByPostId))
      .put('/:postId', wrap(this.updatePost))
      .delete('/:postId', wrap(this.deleteOneByPostId))
      // TODO
      // .get('/authors/:userId', wrap(this.findByUserId))
      // .get('/categories/:categoryId', wrap(this.findByCategoryId))


  }

  createPost: Handler = async (req): Promise<boolean> => {
    const params: CreatePostDto = { ...req.body };

    await this.postService.createPost(params);

    return true;
  }

  findAll: Handler = async (req): Promise<IPostDocument[]> => {
    const posts = await this.postService.findAll();
    return posts;
  }

  findOneByPostId: Handler = async (req): Promise<IPostDocument> => {
    const params: ReadPostByPostIdDto = { ...req.params } as any;

    const post: IPostDocument = await this.postService.findOneByPostId(params);
    return post;
  }
  
  // findByUserId: Handler = async (req): Promise<> => {}

  // findByCategoryId: Handler = async (req): Promise<> => {}

  updatePost: Handler = async (req): Promise<boolean> => {
    const params: UpdatePostDto = {
      ...req.body,
      postId: req.params,
    };

    await this.postService.updatePost(params);

    return true;
  }

  deleteOneByPostId: Handler = async (req): Promise<IPostDocument> => {
    const params: DeletePostByPostIdDto = req.params as any;

    const deletedPost: IPostDocument = await this.postService.deleteOneByPostId(params);

    return deletedPost;
  }
}

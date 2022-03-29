import PostController from "../controllers/post.controller";
import { wrap } from "../lib/wrap";
import { Routes } from "../interfaces";
import { Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import { CreatePostDto, UpdatePostDto } from "../dtos";

export default class PostRoute implements Routes {
  public path = "/posts";
  public router = Router();
  public postController = new PostController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const router = Router();
    router
      .post("/", validationMiddleware(CreatePostDto, "body"), wrap(this.postController.create))
      .get("/", wrap(this.postController.findAll))
      .get("/:id", wrap(this.postController.findOneById))
      .put("/:id", validationMiddleware(UpdatePostDto, "body"), wrap(this.postController.update))
      .delete("/:id", wrap(this.postController.delete))
    this.router.use(this.path, router);
  }
}
import PostController from "../controllers/post.controller";
import { wrap } from "../lib/wrap";
import { Routes } from "../interfaces/routes.interface";
import { Router } from "express";

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
      .post("/", wrap(this.postController.create))
      .get("/", wrap(this.postController.findAll))
      .get("/:slug", wrap(this.postController.findOneBySlug))
      .put("/:slug", wrap(this.postController.update))
      .delete("/:slug", wrap(this.postController.delete))
    this.router.use(this.path, router);
  }
}
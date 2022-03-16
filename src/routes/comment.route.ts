import CommentController from "@controllers/comment.controller";
import { wrap } from "@/lib/wrap";
import { Routes } from "@interfaces/routes.interface";
import { Router } from "express";

export default class CommentRoute implements Routes {
  public path = "/comments";
  public router = Router();
  public commentController = new CommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const router = Router();
    router
      .post("/", wrap(this.commentController.create))
      .get("/", wrap(this.commentController.findByUserId))
      .get("/:postId", wrap(this.commentController.findByPostId))
      .delete("/:commentId", wrap(this.commentController.delete))
      
    this.router.use(this.path, router);
  }
}
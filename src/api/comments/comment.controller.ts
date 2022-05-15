import { Controller } from "@/common/interfaces/controller.interface";
import { Router } from "express";

export default class CommentController implements Controller {
  path = "/comments";
  router = Router();

  createComment() {}

  findAll() {}

  findOneById() {}

  updateComment() {}

  deleteComment() {}
}

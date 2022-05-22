import { Controller } from "../../common/interfaces/controller.interface";
import { CommentModel } from "../../models/comment.model";
import { Handler, Router } from "express";
import { CommentService } from "./comment.service";
import { wrap } from "../../lib/wrap";
import { UserModel } from "../../models/user.model";
import { PostModel } from "../../models/post.model";
import { validationMiddleware } from "../../middlewares";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { ReadCommentByPostIdDto, ReadCommentByUserIdDto } from "./dto/read-comment.dto";
import { DeleteCommentDto } from "./dto/delete-comment.dto";

export default class CommentController implements Controller {
  path = "/comments";
  router = Router();

  commentService = new CommentService(
    CommentModel,
    UserModel,
    PostModel,
  )
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const router = Router();

    router
      .post(
        '/',
        validationMiddleware(CreateCommentDto),
        wrap(this.createComment)
      )
      .get(
        '/',
        validationMiddleware(ReadCommentByUserIdDto),
        wrap(this.findByUserId)
      )
      .get(
        '/:postId',
        validationMiddleware(ReadCommentByPostIdDto),
        wrap(this.findByPostId)
      )
      .delete(
        '/:commentId',
        validationMiddleware(DeleteCommentDto),
        wrap(this.deleteComment)
      )

    this.router.use(this.path, router);
  }

  createComment: Handler = async (req) => {
    const params: CreateCommentDto = {
      ...req.body,
    }

    await this.commentService.createComment(params);

    return true;
  }

  findByUserId: Handler = async (req) => {
    const params: ReadCommentByUserIdDto = { ...req.query } as any;

    const comments = await this.commentService.findByUserId(params);

    return comments;
  }

  findByPostId: Handler = async (req) => {
    const params: ReadCommentByPostIdDto = { ...req.params } as any;

    const comments = await this.commentService.findByPostId(params);

    return comments;
  }

  deleteComment: Handler = async (req) => {
    const params: DeleteCommentDto = { ...req.params } as any;

    const comment = await this.commentService.deleteComment(params);

    return comment;
  }
}

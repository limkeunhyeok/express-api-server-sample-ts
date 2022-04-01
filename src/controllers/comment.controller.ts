import { CreateCommentDto } from "../dtos";
import { Comment } from "../interfaces";
import CommentService from "../services/comment.service";
import { Handler } from "express";

export default class CommentController {
  public commentService = new CommentService();

  public create: Handler = async (req) => {
    const params: CreateCommentDto = { ...req.body };
    const postId = req.query;
    const comment: Comment = await this.commentService.createComment(params);
    return comment;
  }

  public findByUserId: Handler = async (req, res) => {
    const { user } = res.locals;
    const comments: Comment[] = await this.commentService.findByUserIdAndSortByPostId(user.id);
    return comments;
  }

  public findByPostId: Handler = async (req) => {
    const postId: string = req.params.postId;
    const comments: Comment[] = await this.commentService.findByPostId(postId);
    return comments;
  }
  
  public delete: Handler = async (req, res) => {
    const { user } = res.locals;
    const commentId: string = req.params.commentId;
    const comment: Comment = await this.commentService.deletedComment(commentId, user.id);
    return comment;
  }
}
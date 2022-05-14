import { Comment } from "../interfaces";
import { BadRequestException } from "../common/exceptions";
import CommentModel from "../models/comment.model";
import { CreateCommentDto } from "../dtos";
import PostModel from "../models/post.model";
import UserModel from "../models/user.model";
import { UnauthorizedException } from "../common/exceptions";

export default class CommentService {
  public Comment = CommentModel;
  public Post = PostModel;
  public User = UserModel;

  public async createComment(postId, commentData: CreateCommentDto): Promise<Comment> {
    const hasUser = await this.User.findOne({ _id: commentData.userId });
    if (!hasUser) throw new BadRequestException("User does not exists.");

    const hasPost = await this.Post.findOne({ _id: postId });
    if (!hasPost) throw new BadRequestException("Post does not exists.");

    const now = new Date().toISOString();
    const createdCommentData: Comment = await this.Comment.create({
      ...commentData,
      postId,
      createdAt: now
    });
    return createdCommentData;
  }

  public async findByUserIdAndSortByPostId(userId: string): Promise<Comment[]> {
    const comments: Comment[] = await this.Comment.find({ userId });
    const postIdSet = new Set(comments.map(comment => comment.postId.toString()))
    
    let result = [];
    for (const postId of postIdSet) {
      const post = await this.Post.findOne({ _id: postId });
      const data = {
        postId,
        title: post.title,
        comments: comments.filter((comment) => comment.postId.toString() === postId),
      }
      result = [...result, data];
    }
    return result;
  }

  public async findByPostId(postId: string): Promise<Comment[]> {
    const commnets: Comment[] = await this.Comment.find({ postId });
    return commnets;
  }

  public async deletedComment(commentId: string, userId: string): Promise<Comment> {
    const hasComment: Comment = await this.Comment.findOne({ _id: commentId });
    if (!hasComment) throw new BadRequestException("Comment does not exists");

    if (hasComment.userId.toString() !== userId) throw new UnauthorizedException("Access is denied.");

    const deletedComment: Comment = await this.Comment.findByIdAndDelete(commentId);
    return deletedComment
  }
}

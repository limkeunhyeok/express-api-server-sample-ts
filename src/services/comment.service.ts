import { Comment } from "@interfaces/comment.interface";
import { BadRequestException } from "@exceptions/bad-request.exception";
import CommentModel from "@models/comment.model";
import { CreateCommentDto } from "@dtos/comment.dto";
import PostModel from "@/models/post.model";
import { UnauthorizedException } from "@/exceptions/unauthorized.exception";

export default class CategoryService {
  public Comment = CommentModel;
  public Post = PostModel;

  public async createComment(commentData: CreateCommentDto): Promise<Comment> {
    const now = new Date().toISOString();
    const createdCommentData: Comment = await this.Comment.create({
      ...commentData,
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

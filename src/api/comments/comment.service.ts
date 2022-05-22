import { IPostModel, IPostDocument } from "../../models/post.model";
import { IUserModel, IUserDocument } from "../../models/user.model";
import { ICommentModel, ICommentDocument } from "../../models/comment.model";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { BadRequestException } from "@/common/exceptions";
import { ReadCommentByPostIdDto, ReadCommentByUserIdDto } from "./dto/read-comment.dto";
import { DeleteCommentDto } from "./dto/delete-comment.dto";

export class CommentService {
  constructor(
    private readonly CommentModel: ICommentModel,
    private readonly UserModel: IUserModel,
    private readonly PostModel: IPostModel
  ) {}

  async createComment({ userId, postId, content }: CreateCommentDto): Promise<void> {
    const hasUser: IUserDocument = await this.UserModel.findOneByUserId(userId);
    if (!hasUser) {
      throw new BadRequestException('The user does not exists.');
    }

    const hasPost: IPostDocument = await this.PostModel.findOneByPostId(postId);
    if (!hasPost) {
      throw new BadRequestException('The post does not exists.');
    }

    await this.CommentModel.createComment({
      userId,
      postId,
      content
    })
  }

  async findByUserId({ userId }: ReadCommentByUserIdDto): Promise<ICommentDocument[]> {
    const hasUser: IUserDocument = await this.UserModel.findOneByUserId(userId);
    if (!hasUser) {
      throw new BadRequestException('The user does not exists.');
    }

    const comments: ICommentDocument[] = await this.CommentModel.findByUserId(userId);
    return comments;
  }
  
  async findByPostId({ postId }: ReadCommentByPostIdDto): Promise<ICommentDocument[]> {
    const hasPost: IPostDocument = await this.PostModel.findOneByPostId(postId);
    if (!hasPost) {
      throw new BadRequestException('The post does not exists.');
    }

    const comments: ICommentDocument[] = await this.CommentModel.findByPostId(postId);
    return comments;
  }

  async deleteComment({ commentId }: DeleteCommentDto): Promise<ICommentDocument> {
    const comment: ICommentDocument = await this.CommentModel.deleteOneByCommentId(commentId);
    return comment;
  }
}

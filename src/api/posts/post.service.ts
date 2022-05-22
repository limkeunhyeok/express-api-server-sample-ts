import {
  BadRequestException,
  UnauthorizedException,
} from "../../common/exceptions";
import { CreatePostDto } from "./dto/create-post.dto";
import { ICategoryDocument, ICategoryModel } from "../../models/category.model";
import { IUserDocument, IUserModel } from "../../models/user.model";
import { DeleteResult } from "mongodb";
import { IPostDocument, IPostModel } from "../../models/post.model";
import {
  DeletePostByCategoryIdDto,
  DeletePostByPostIdDto,
  DeletePostByUserIdDto,
} from "./dto/delete-post.dto";
import {
  ReadPostByCategoryIdDto,
  ReadPostByPostIdDto,
  ReadPostByUserIdDto,
} from "./dto/read-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

export class PostService {
  constructor(
    private readonly PostModel: IPostModel,
    private readonly UserModel: IUserModel,
    private readonly CategoryModel: ICategoryModel
  ) {}

  async createPost({
    userId,
    categoryId,
    title,
    content,
  }: CreatePostDto): Promise<void> {
    const hasUser: IUserDocument = await this.UserModel.findOneByUserId(userId);
    if (!hasUser) {
      throw new BadRequestException("The user does not exists.");
    }

    const hasCategory: ICategoryDocument =
      await this.CategoryModel.findOneByCategoryId(categoryId);
    if (!hasCategory) {
      throw new BadRequestException("The category does not exists.");
    }

    await this.PostModel.createPost({
      userId,
      categoryId,
      title,
      content,
    });
  }

  async findAll(): Promise<IPostDocument[]> {
    const posts: IPostDocument[] = await this.PostModel.findAll();
    return posts;
  }

  async findOneByPostId({
    postId,
  }: ReadPostByPostIdDto): Promise<IPostDocument> {
    const hasPost: IPostDocument = await this.PostModel.findOneByPostId(postId);
    if (!hasPost) {
      throw new BadRequestException("The post does not exists.");
    }

    return hasPost;
  }

  async findByUserId({
    userId,
  }: ReadPostByUserIdDto): Promise<IPostDocument[]> {
    const hasUser: IUserDocument = await this.UserModel.findOneByUserId(userId);
    if (!hasUser) {
      throw new BadRequestException("The user does not exists.");
    }

    const posts: IPostDocument[] = await this.PostModel.findByUserId(userId);
    return posts;
  }

  async findByCategoryId({
    categoryId,
  }: ReadPostByCategoryIdDto): Promise<IPostDocument[]> {
    const hasCategory: ICategoryDocument =
      await this.CategoryModel.findOneByCategoryId(categoryId);
    if (!hasCategory) {
      throw new BadRequestException("The category does not exists.");
    }

    const posts: IPostDocument[] = await this.PostModel.findByCategoryId(
      categoryId
    );
    return posts;
  }

  async updatePost({
    postId,
    userId,
    title,
    content,
  }: UpdatePostDto): Promise<void> {
    const post: IPostDocument = await this.PostModel.findOneByPostId(postId);
    if (!post) {
      throw new BadRequestException("The post does not exists.");
    }

    if (post.userId !== userId) {
      throw new UnauthorizedException("Access is denied.");
    }

    await post.updatePost({
      title,
      content,
    });
  }

  async deleteOneByPostId({ postId }: DeletePostByPostIdDto) {
    const post: IPostDocument = await this.PostModel.deleteOneByPostId(postId);
    if (!post) {
      throw new BadRequestException("The post does not exists.");
    }

    return post;
  }

  async deleteByUserId({ userId }: DeletePostByUserIdDto) {
    const deleteResult: DeleteResult = await this.PostModel.deleteByUserId(
      userId
    );
    return deleteResult;
  }

  async deleteByCategoryId({ categoryId }: DeletePostByCategoryIdDto) {
    const deleteResult: DeleteResult = await this.PostModel.deleteByCategoryId(
      categoryId
    );
    return deleteResult;
  }
}

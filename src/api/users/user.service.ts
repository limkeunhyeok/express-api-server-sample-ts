import { BadRequestException } from "../../common/exceptions";
import { IUserDocument, IUserModel } from "../../models/user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { ReadUserDto } from "./dto/read-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

export class UserService {
  constructor(private readonly UserModel: IUserModel) {}

  async createUser({ email, password, nick }: CreateUserDto): Promise<void> {
    const hasUser: IUserDocument = await this.UserModel.findOneByEmail(email);
    if (hasUser) {
      throw new BadRequestException("Email is already exists.");
    }

    await this.UserModel.createUser({
      email,
      password,
      nick,
    });
  }

  async findAll(): Promise<IUserDocument[]> {
    const users: IUserDocument[] = await this.UserModel.findAll();
    return users;
  }

  async findOneByUserId({ userId }: ReadUserDto): Promise<IUserDocument> {
    const hasUser: IUserDocument = await this.UserModel.findOneByUserId(userId);
    if (!hasUser) {
      throw new BadRequestException("The user does not exists.");
    }

    return hasUser;
  }

  async updateUser({
    userId,
    email,
    password,
    nick,
  }: UpdateUserDto): Promise<void> {
    const user: IUserDocument = await this.UserModel.findOneByUserId(userId);
    if (!user) {
      throw new BadRequestException("The user does not exists.");
    }

    await user.updateUser({
      email,
      password,
      nick,
    });
  }

  async deleteUser({ userId }: DeleteUserDto): Promise<IUserDocument> {
    const hasUser: IUserDocument = await this.UserModel.findOneByUserId(userId);
    if (!hasUser) {
      throw new BadRequestException("The user does not exists.");
    }

    const deletedUser: IUserDocument = await this.UserModel.deleteOneByUserId(
      userId
    );
    return deletedUser;
  }
}

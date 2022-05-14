import UserModel from "../models/user.model";
import { User } from "../interfaces";
import { hash } from "bcrypt";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { BadRequestException } from "../common/exceptions";

export default class UserService {
  public User = UserModel;

  public async findAllUser(): Promise<User[]> {
    const users = await this.User.find({});
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    const hasUser = await this.User.findOne({ _id: userId });

    if (!hasUser) throw new BadRequestException("The user does not exists.")
    
    return hasUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    const hasUser: User = await this.User.findOne({ email: userData.email });
    if (hasUser) throw new BadRequestException("Email is already exists.");

    const encryptedPassword = await hash(userData.password, 10);
    const now = new Date().toISOString();
    const createdUserData: User = await this.User.create({
      ...userData,
      password: encryptedPassword,
      createdAt: now,
      updatedAt: now,
    });
    return createdUserData;
  }

  public async updateUser(userId: string, userData: UpdateUserDto): Promise<User> {
    const hasUser: User = await this.User.findOne({ _id: userId });
    if (!hasUser) throw new BadRequestException("The user does not exist.");

    const encryptedPassword = await hash(userData.password, 10);
    const now = new Date().toISOString();
    const updatedUserData: User = await this.User.findByIdAndUpdate(userId, {
      ...userData,
      password: encryptedPassword,
      updatedAt: now,
    }, {
      new: true
    });
    return updatedUserData;
  }

  public async deleteUser(userId: string): Promise<User> {
    const hasUser: User = await this.User.findOne({ _id: userId });
    if (!hasUser) throw new BadRequestException("The user does not exist.");

    const deletedUserData: User = await this.User.findByIdAndDelete(userId);
    return deletedUserData;
  }
}
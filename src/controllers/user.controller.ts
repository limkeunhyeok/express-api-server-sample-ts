import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import { User } from "../interfaces/user.interface";
import UserService from "../services/user.service";
import { Handler } from "express";

export default class AuthController {
  public userService = new UserService();

  public findAll: Handler = async (req, res, next) => {
    const users: User[] = await this.userService.findAllUser();
    return users;
  }

  public findOneById: Handler = async (req, res, next) => {
    const userId: string = req.params.id;
    const user: User = await this.userService.findUserById(userId);
    return user;
  }

  public create: Handler = async (req, res, next) => {
    const params: CreateUserDto = { ...req.body };
    const user: User = await this.userService.createUser(params);
    return user;
  }

  public update: Handler = async (req, res, next) => {
    const userId: string = req.params.id;
    const params: UpdateUserDto = { ...req.body };
    const user: User = await this.userService.updateUser(userId, params);
    return user;
  }

  public delete: Handler = async (req, res, next) => {
    const userId: string = req.params.id;
    const user: User = await this.userService.deleteUser(userId);
    return user;
  }
}
import UserService from "../services/user.service";
import { Handler } from "express";
export default class AuthController {
    userService: UserService;
    findAll: Handler;
    findOneById: Handler;
    create: Handler;
    update: Handler;
    delete: Handler;
}

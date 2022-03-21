import { CreateUserDto } from "../dtos/user.dto";
import { User } from "../interfaces/user.interface";
import AuthService from "../services/auth.service";
import { Handler } from "express";

export default class AuthController {
  public authService = new AuthService();

  public signUp: Handler = async (req, res, next) => {
    const userData: CreateUserDto = { ...req.body };
    const signUpUserData: User = await this.authService.signUp(userData);
    return signUpUserData
  }

  public signIn: Handler = async (req, res, next) => {
    const userData: CreateUserDto = { ...req.body };
    const token: object = await this.authService.signIn(userData);
    return token
  }  
}
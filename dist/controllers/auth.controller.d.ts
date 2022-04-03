import AuthService from "../services/auth.service";
import { Handler } from "express";
export default class AuthController {
    authService: AuthService;
    signUp: Handler;
    signIn: Handler;
}

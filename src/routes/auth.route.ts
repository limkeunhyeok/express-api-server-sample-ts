import AuthController from "../controllers/auth.controller";
import { wrap } from "../lib/wrap";
import { Routes } from "../interfaces/routes.interface";
import { Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";

export default class AuthRoute implements Routes {
  public path = "/auth";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const router = Router();
    router
      .post("/signUp", validationMiddleware(CreateUserDto, "body"), wrap(this.authController.signUp))
      .post("/signIn", wrap(this.authController.signIn))
    this.router.use(this.path, router);
  }
}
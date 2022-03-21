import AuthController from "../controllers/auth.controller";
import { wrap } from "../lib/wrap";
import { Routes } from "../interfaces/routes.interface";
import { Router } from "express";

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
      .post("/signUp", wrap(this.authController.signUp))
      .post("/signIn", wrap(this.authController.signIn))
    this.router.use(this.path, router);
  }
}
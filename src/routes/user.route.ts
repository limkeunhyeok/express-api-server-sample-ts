import UserController from "@controllers/user.controller";
import { wrap } from "@/lib/wrap";
import { Routes } from "@interfaces/routes.interface";
import { Router } from "express";

export default class UserRoute implements Routes {
  public path = "/users";
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const router = Router();
    router
      .get("/", wrap(this.userController.findAll))
      .get("/:id", wrap(this.userController.findOneById))
      .post("/", wrap(this.userController.create))
      .put("/:id", wrap(this.userController.update))
      .delete("/:id", wrap(this.userController.delete));
    this.router.use(this.path, router);
  }
}
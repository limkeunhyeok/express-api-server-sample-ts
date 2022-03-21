import CategoryController from "../controllers/category.controller";
import { wrap } from "../lib/wrap";
import { Routes } from "../interfaces/routes.interface";
import { Router } from "express";

export default class CategoryRoute implements Routes {
  public path = "/categories";
  public router = Router();
  public categoryController = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const router = Router();
    router
      .post("/", wrap(this.categoryController.create))
      .get("/", wrap(this.categoryController.findAll))
      .get("/:id", wrap(this.categoryController.findOneById))
      .put("/:categoryId", wrap(this.categoryController.update))
      .delete("/:categoryId", wrap(this.categoryController.delete))
      
    this.router.use(this.path, router);
  }
}
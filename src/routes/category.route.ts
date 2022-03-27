import CategoryController from "../controllers/category.controller";
import { wrap } from "../lib/wrap";
import { Routes } from "../interfaces";
import { CreateCategoryDto, UpdateCategoryDto } from "../dtos";
import validationMiddleware from "../middlewares/validation.middleware";
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
      .post("/", validationMiddleware(CreateCategoryDto, "body"), wrap(this.categoryController.create))
      .get("/", wrap(this.categoryController.findAll))
      .get("/:id", wrap(this.categoryController.findOneById))
      .put("/:id", validationMiddleware(UpdateCategoryDto, "body"), wrap(this.categoryController.update))
      .delete("/:id", wrap(this.categoryController.delete))
      
    this.router.use(this.path, router);
  }
}
import { Controller } from "../../common/interfaces/controller.interface";
import { CategoryModel } from "../../models/category.model";
import { Handler, Router } from "express";
import { CategoryService } from "./category.service";
import { validationMiddleware } from "../../middlewares";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { wrap } from "../../lib/wrap";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { DeleteCategoryDto } from "./dto/delete-category.dto";
import { ReadCategoryByCategoryIdDto } from "./dto/read-category.dto";

export default class CategoryController implements Controller {
  path = "/categories";
  router = Router();

  categoryService = new CategoryService(CategoryModel);

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    const router = Router();

    router
      .post(
        "/",
        validationMiddleware(CreateCategoryDto),
        wrap(this.createCategory)
      )
      .get("/", wrap(this.findAll))
      .get("/:categoryId", wrap(this.findOneById))
      .put(
        "/:categoryId",
        validationMiddleware(UpdateCategoryDto),
        wrap(this.updateCategory)
      )
      .delete(
        "/:categoryId",
        validationMiddleware(DeleteCategoryDto),
        wrap(this.deleteCategory)
      );
  }

  createCategory: Handler = async (req) => {
    const params: CreateCategoryDto = { ...req.body };

    await this.categoryService.createCategory(params);

    return true;
  };

  findAll: Handler = async (req) => {
    const categories = await this.categoryService.findAll();
    return categories;
  };

  findOneById: Handler = async (req) => {
    const params: ReadCategoryByCategoryIdDto = { ...req.params } as any;

    const category = await this.categoryService.findOneByCategoryId(params);
    return category;
  };

  updateCategory: Handler = async (req) => {
    const params: UpdateCategoryDto = {
      ...req.body,
      categoryId: req.params.categoryId,
    };

    await this.categoryService.updateCategory(params);

    return true;
  };

  deleteCategory: Handler = async (req) => {
    const params: DeleteCategoryDto = req.params as any;

    const deletedCategory = await this.categoryService.deleteCategory(params);

    return deletedCategory;
  };
}

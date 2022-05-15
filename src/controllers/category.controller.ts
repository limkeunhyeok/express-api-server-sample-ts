import { CreateCategoryDto, UpdateCategoryDto } from "../dtos";
import { Category } from "../interfaces";
import CategoryService from "../services/category.service";
import { Handler } from "express";

export default class CategoryController {
  public categoryService = new CategoryService();

  public findAll: Handler = async () => {
    const categories: Category[] = await this.categoryService.findAll();
    return categories;
  };

  public findOneById: Handler = async (req) => {
    const categoryId: string = req.params.id;
    const category: Category = await this.categoryService.findOneByCategoryId(
      categoryId
    );
    return category;
  };

  public create: Handler = async (req) => {
    const params: CreateCategoryDto = { ...req.body };
    const category: Category = await this.categoryService.createCategory(
      params
    );
    return category;
  };

  public update: Handler = async (req) => {
    const categoryId: string = req.params.id;
    const params: UpdateCategoryDto = { ...req.body };
    const category: Category = await this.categoryService.updateCategory(
      categoryId,
      params
    );
    return category;
  };

  public delete: Handler = async (req) => {
    const categoryId: string = req.params.id;
    const category: Category = await this.categoryService.deleteCategory(
      categoryId
    );
    return category;
  };
}

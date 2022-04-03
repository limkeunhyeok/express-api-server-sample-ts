import CategoryService from "../services/category.service";
import { Handler } from "express";
export default class CategoryController {
    categoryService: CategoryService;
    findAll: Handler;
    findOneById: Handler;
    create: Handler;
    update: Handler;
    delete: Handler;
}

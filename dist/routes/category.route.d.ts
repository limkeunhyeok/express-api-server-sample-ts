import CategoryController from "../controllers/category.controller";
import { Routes } from "../interfaces";
export default class CategoryRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    categoryController: CategoryController;
    constructor();
    private initializeRoutes;
}

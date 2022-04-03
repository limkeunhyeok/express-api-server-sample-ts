"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const category_service_1 = tslib_1.__importDefault(require("../services/category.service"));
class CategoryController {
    constructor() {
        this.categoryService = new category_service_1.default();
        this.findAll = async () => {
            const categories = await this.categoryService.findAll();
            return categories;
        };
        this.findOneById = async (req) => {
            const categoryId = req.params.id;
            const category = await this.categoryService.findOneByCategoryId(categoryId);
            return category;
        };
        this.create = async (req) => {
            const params = Object.assign({}, req.body);
            const category = await this.categoryService.createCategory(params);
            return category;
        };
        this.update = async (req) => {
            const categoryId = req.params.id;
            const params = Object.assign({}, req.body);
            const category = await this.categoryService.updateCategory(categoryId, params);
            return category;
        };
        this.delete = async (req) => {
            const categoryId = req.params.id;
            const category = await this.categoryService.deleteCategory(categoryId);
            return category;
        };
    }
}
exports.default = CategoryController;
//# sourceMappingURL=category.controller.js.map
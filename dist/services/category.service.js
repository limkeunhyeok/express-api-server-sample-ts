"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const exceptions_1 = require("../exceptions");
const category_model_1 = tslib_1.__importDefault(require("../models/category.model"));
class CategoryService {
    constructor() {
        this.Category = category_model_1.default;
    }
    async findAll() {
        const categories = await this.Category.find({});
        return categories;
    }
    async findOneByCategoryId(categoryId) {
        const hasCategory = await this.Category.findOne({ _id: categoryId });
        if (!hasCategory)
            throw new exceptions_1.BadRequestException("The category does not exists.");
        return hasCategory;
    }
    async createCategory(categoryData) {
        const hasCategory = await this.Category.findOne({ title: categoryData.title });
        if (hasCategory)
            throw new exceptions_1.BadRequestException("The category already exists");
        const now = new Date().toISOString();
        const createdCategoryData = await this.Category.create(Object.assign(Object.assign({}, categoryData), { createdAt: now }));
        return createdCategoryData;
    }
    async updateCategory(categoryId, categoryData) {
        const hasCategory = await this.Category.findOne({ _id: categoryId });
        if (!hasCategory)
            throw new exceptions_1.BadRequestException("Category does not exists.");
        const updatedCategoryData = await this.Category.findByIdAndUpdate(categoryId, Object.assign({}, categoryData), { new: true });
        return updatedCategoryData;
    }
    async deleteCategory(categoryId) {
        const hasCategory = await this.Category.findOne({ _id: categoryId });
        if (!hasCategory)
            throw new exceptions_1.BadRequestException("Category does not exists.");
        const deletedCategoryData = await this.Category.findByIdAndDelete(categoryId);
        return deletedCategoryData;
    }
}
exports.default = CategoryService;
//# sourceMappingURL=category.service.js.map
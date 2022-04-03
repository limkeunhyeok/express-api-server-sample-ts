"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const category_controller_1 = tslib_1.__importDefault(require("../controllers/category.controller"));
const wrap_1 = require("../lib/wrap");
const dtos_1 = require("../dtos");
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
const express_1 = require("express");
class CategoryRoute {
    constructor() {
        this.path = "/categories";
        this.router = (0, express_1.Router)();
        this.categoryController = new category_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const router = (0, express_1.Router)();
        router
            .post("/", (0, validation_middleware_1.default)(dtos_1.CreateCategoryDto, "body"), (0, wrap_1.wrap)(this.categoryController.create))
            .get("/", (0, wrap_1.wrap)(this.categoryController.findAll))
            .get("/:id", (0, wrap_1.wrap)(this.categoryController.findOneById))
            .put("/:id", (0, validation_middleware_1.default)(dtos_1.UpdateCategoryDto, "body"), (0, wrap_1.wrap)(this.categoryController.update))
            .delete("/:id", (0, wrap_1.wrap)(this.categoryController.delete));
        this.router.use(this.path, router);
    }
}
exports.default = CategoryRoute;
//# sourceMappingURL=category.route.js.map
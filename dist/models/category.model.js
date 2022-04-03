"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    versionKey: false,
});
const CategoryModel = (0, mongoose_1.model)("Category", categorySchema);
exports.default = CategoryModel;
//# sourceMappingURL=category.model.js.map
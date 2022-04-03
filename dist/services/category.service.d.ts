/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose" />
import { Category } from "../interfaces";
import { CreateCategoryDto, UpdateCategoryDto } from "../dtos";
export default class CategoryService {
    Category: import("mongoose").Model<Category & import("mongoose").Document<any, any, any>, {}, {}, {}>;
    findAll(): Promise<Category[]>;
    findOneByCategoryId(categoryId: string): Promise<Category>;
    createCategory(categoryData: CreateCategoryDto): Promise<Category>;
    updateCategory(categoryId: string, categoryData: UpdateCategoryDto): Promise<Category>;
    deleteCategory(categoryId: string): Promise<Category>;
}

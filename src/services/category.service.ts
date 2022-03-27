import { Category } from "../interfaces";
import { BadRequestException } from "../exceptions";
import CategoryModel from "../models/category.model";
import { CreateCategoryDto, UpdateCategoryDto } from "../dtos";

export default class CategoryService {
  public Category = CategoryModel;

  public async findAll(): Promise<Category[]> {
    const categories: Category[] = await this.Category.find({});
    return categories;
  }

  public async findOneByCategoryId(categoryId: string): Promise<Category> {
    const hasCategory: Category = await this.Category.findOne({ _id: categoryId });

    if (!hasCategory) throw new BadRequestException("The category does not exists.")

    return hasCategory;
  }

  public async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    const hasCategory: Category = await this.Category.findOne({ title: categoryData.title });
    if (hasCategory) throw new BadRequestException("The category already exists");

    const now = new Date().toISOString();
    const createdCategoryData: Category = await this.Category.create({
      ...categoryData,
      createdAt: now
    });
    return createdCategoryData;
  }

  public async updateCategory(categoryId: string, categoryData: UpdateCategoryDto): Promise<Category> {
    const hasCategory: Category = await this.Category.findOne({ _id: categoryId });
    if (!hasCategory) throw new BadRequestException("Category does not exists.");

    const updatedCategoryData: Category = await this.Category.findByIdAndUpdate(categoryId, { ...categoryData });
    return updatedCategoryData;
  }

  public async deleteCategory(categoryId: string): Promise<Category> {
    const hasCategory: Category = await this.Category.findOne({ _id: categoryId });
    if (!hasCategory) throw new BadRequestException("Category does not exists.");

    const deletedCategoryData: Category = await this.Category.findByIdAndDelete(categoryId);
    return deletedCategoryData;
  }
}

import { CreateCategoryDto } from "./dto/create-category.dto";
import { ICategoryModel, ICategoryDocument } from "../../models/category.model";
import { BadRequestException } from "../../common/exceptions";
import { ReadCategoryByCategoryIdDto } from "./dto/read-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { DeleteCategoryDto } from "./dto/delete-category.dto";

export class CategoryService {
  constructor(private readonly CategoryModel: ICategoryModel) {}

  async createCategory({ title }: CreateCategoryDto): Promise<void> {
    const hasCategory: ICategoryDocument =
      await this.CategoryModel.findOneByTitle(title);
    if (hasCategory) {
      throw new BadRequestException("The category is already exists.");
    }

    await this.CategoryModel.createCategory({
      title,
    });
  }

  async findAll(): Promise<ICategoryDocument[]> {
    const categories: ICategoryDocument[] = await this.CategoryModel.findAll();
    return categories;
  }

  async findOneByCategoryId({
    categoryId,
  }: ReadCategoryByCategoryIdDto): Promise<ICategoryDocument> {
    const hasCategory: ICategoryDocument =
      await this.CategoryModel.findOneByCategoryId(categoryId);
    if (!hasCategory) {
      throw new BadRequestException("The category does not exists.");
    }
    return hasCategory;
  }

  async updateCategory({
    categoryId,
    title,
  }: UpdateCategoryDto): Promise<void> {
    const category: ICategoryDocument =
      await this.CategoryModel.findOneByCategoryId(categoryId);
    if (!category) {
      throw new BadRequestException("The category does not exists.");
    }

    await category.updateCategory({
      title,
    });
  }

  async deleteCategory({
    categoryId,
  }: DeleteCategoryDto): Promise<ICategoryDocument> {
    const category: ICategoryDocument =
      await this.CategoryModel.deleteOneByCategoryId(categoryId);
    if (!category) {
      throw new BadRequestException("The category does not exists.");
    }
    return category;
  }
}

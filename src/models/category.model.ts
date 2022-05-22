import { model, Schema, Document, Model } from "mongoose";

export interface CategoryInfo {
  title: string;
}

export interface Category extends CategoryInfo {
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryDocument extends Category, Document {
  updateCategory: (
    this: ICategoryDocument,
    categoryInfo: Partial<Category>
  ) => Promise<void>;
}

export interface ICategoryModel extends Model<ICategoryDocument> {
  createCategory: (
    this: ICategoryModel,
    categoryDoc: Partial<Category>
  ) => Promise<void>;
  findOneByTitle: (
    this: ICategoryModel,
    title: string
  ) => Promise<ICategoryDocument>;
  findOneByCategoryId: (
    this: ICategoryModel,
    categoryId: string
  ) => Promise<ICategoryDocument>;
  findAll: (this: ICategoryModel) => Promise<ICategoryDocument[]>;
  deleteOneByCategoryId: (
    this: ICategoryModel,
    categoryId: string
  ) => Promise<ICategoryDocument>;
}

const categorySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

categorySchema.statics.createCategory = async function (
  categoryDoc: Partial<Category>
): Promise<void> {
  const now: Date = new Date();
  const category: Category = {
    title: categoryDoc.title,
    createdAt: now,
    updatedAt: now,
  };
  await this.create(category);
};

categorySchema.statics.findOneByTitle = async function (
  title: string
): Promise<ICategoryDocument> {
  const category: ICategoryDocument = await this.findOne({ title });
  return category;
};

categorySchema.statics.findOneByCategoryId = async function (
  categoryId: string
): Promise<ICategoryDocument> {
  const category: ICategoryDocument = await this.findOne({ _id: categoryId });
  return category;
};

categorySchema.statics.findAll = async function (): Promise<
  ICategoryDocument[]
> {
  const categories: ICategoryDocument[] = await this.find({});
  return categories;
};

categorySchema.statics.deleteOneByCategoryId = async function (
  categoryId: string
): Promise<ICategoryDocument> {
  const category: ICategoryDocument = await this.findByIdAndDelete(categoryId);
  return category;
};

categorySchema.methods.updateCategory = async function (
  categoryInfo: Partial<Category>
): Promise<void> {
  const now: Date = new Date();

  this.title = categoryInfo.title;
  this.updatedAt = now;

  await this.save();
};

export const CategoryModel = model<ICategoryDocument>(
  "Category",
  categorySchema
) as ICategoryModel;

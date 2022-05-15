import { model, Schema, Document, Model } from "mongoose";

export interface CategoryInfo {
  title: string;
}

export interface Category extends CategoryInfo {
  createdAt: Date;
}

export interface ICategoryDocument extends Category, Document {}

export interface ICategoryModel extends Model<ICategoryDocument> {}

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

const CategoryModel = model<Category & Document>("Category", categorySchema);

export default CategoryModel;

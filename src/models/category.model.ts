import { model, Schema, Document } from "mongoose";
import { Category } from "../interfaces";

const categorySchema: Schema = new Schema({
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

const CategoryModel = model<Category & Document>("Category", categorySchema);

export default CategoryModel;
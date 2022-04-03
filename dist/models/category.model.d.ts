/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
import { Document } from "mongoose";
import { Category } from "../interfaces";
declare const CategoryModel: import("mongoose").Model<Category & Document<any, any, any>, {}, {}, {}>;
export default CategoryModel;

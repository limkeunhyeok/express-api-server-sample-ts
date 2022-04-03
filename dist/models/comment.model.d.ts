/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
import { Document } from "mongoose";
import { Comment } from "../interfaces";
declare const CommentModel: import("mongoose").Model<Comment & Document<any, any, any>, {}, {}, {}>;
export default CommentModel;

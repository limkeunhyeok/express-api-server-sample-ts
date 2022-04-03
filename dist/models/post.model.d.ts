/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
import { Document } from "mongoose";
import { Post } from "../interfaces";
declare const PostModel: import("mongoose").Model<Post & Document<any, any, any>, {}, {}, {}>;
export default PostModel;

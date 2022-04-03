/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
import { Document } from "mongoose";
import { User } from "../interfaces";
declare const UserModel: import("mongoose").Model<User & Document<any, any, any>, {}, {}, {}>;
export default UserModel;

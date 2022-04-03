/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose" />
import { User } from "../interfaces";
import { CreateUserDto } from "../dtos";
export default class AuthService {
    User: import("mongoose").Model<User & import("mongoose").Document<any, any, any>, {}, {}, {}>;
    signUp(userData: CreateUserDto): Promise<User>;
    signIn(userData: CreateUserDto): Promise<object>;
}

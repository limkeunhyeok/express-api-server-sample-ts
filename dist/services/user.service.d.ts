/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose" />
import { User } from "../interfaces";
import { CreateUserDto, UpdateUserDto } from "../dtos";
export default class UserService {
    User: import("mongoose").Model<User & import("mongoose").Document<any, any, any>, {}, {}, {}>;
    findAllUser(): Promise<User[]>;
    findUserById(userId: string): Promise<User>;
    createUser(userData: CreateUserDto): Promise<User>;
    updateUser(userId: string, userData: UpdateUserDto): Promise<User>;
    deleteUser(userId: string): Promise<User>;
}

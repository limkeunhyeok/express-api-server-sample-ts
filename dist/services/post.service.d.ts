/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose" />
import { CreatePostDto, UpdatePostDto } from "../dtos";
import { Post } from "../interfaces";
export default class PostService {
    Post: import("mongoose").Model<Post & import("mongoose").Document<any, any, any>, {}, {}, {}>;
    User: import("mongoose").Model<import("../interfaces").User & import("mongoose").Document<any, any, any>, {}, {}, {}>;
    Category: import("mongoose").Model<import("../interfaces").Category & import("mongoose").Document<any, any, any>, {}, {}, {}>;
    findAll(): Promise<Post[]>;
    findAllByUserId(userId: string): Promise<Post[]>;
    findAllByCategoryId(categoryId: string): Promise<Post[]>;
    findOneByPostId(postId: string): Promise<Post>;
    createPost(postData: CreatePostDto): Promise<Post>;
    updatePost(postId: string, postData: UpdatePostDto): Promise<Post>;
    deletePost(postId: string): Promise<Post>;
}

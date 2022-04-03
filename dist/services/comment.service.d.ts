/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose" />
import { Comment } from "../interfaces";
import { CreateCommentDto } from "../dtos";
export default class CommentService {
    Comment: import("mongoose").Model<Comment & import("mongoose").Document<any, any, any>, {}, {}, {}>;
    Post: import("mongoose").Model<import("../interfaces").Post & import("mongoose").Document<any, any, any>, {}, {}, {}>;
    User: import("mongoose").Model<import("../interfaces").User & import("mongoose").Document<any, any, any>, {}, {}, {}>;
    createComment(postId: any, commentData: CreateCommentDto): Promise<Comment>;
    findByUserIdAndSortByPostId(userId: string): Promise<Comment[]>;
    findByPostId(postId: string): Promise<Comment[]>;
    deletedComment(commentId: string, userId: string): Promise<Comment>;
}

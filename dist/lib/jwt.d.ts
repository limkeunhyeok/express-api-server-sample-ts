import * as jwt from "jsonwebtoken";
export interface JwtPayload {
    id: string;
    nick: string;
}
export declare const create: (payload: JwtPayload) => string;
export declare const verify: (token: string) => string | jwt.JwtPayload;

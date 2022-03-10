import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "keyboard cat";

export interface JwtPayload {
  userId: string;
  nick: string;
}


export const create = (payload: JwtPayload) => {
  return sign(payload, JWT_SECRET, {
    expiresIn: "7d",    
  });
}

export const verfiy = (token: string) => {
  return verify(token, JWT_SECRET);
}
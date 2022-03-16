import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "keyboard cat";

export interface JwtPayload {
  id: string;
  nick: string;
}


export const create = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",    
  });
}

export const verify = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
}
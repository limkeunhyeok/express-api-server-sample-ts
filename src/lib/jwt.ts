import { BadRequestException } from "@/common/exceptions";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "keyboard cat";

export interface JwtPayload {
  id: string;
  nick: string;
}

export interface Token {
  token: string;
}

export const createToken = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    throw new BadRequestException("Token is invalid.");
  }
};

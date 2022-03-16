import { UnauthorizedException } from "@exceptions/unauthorized.exception";
import { verify } from "@/lib/jwt";
import { Handler } from "express";

const authMiddleware: Handler = (req, res, next) => {
  const bearerToken: string = req.headers.authorization;
  if (bearerToken) {
    try {
      const token = bearerToken.replace(/^Bearer /, " ");
      const decoded = verify(token);
      res.locals.user = decoded;
      next();
    } catch (err) {
      next(new UnauthorizedException());
    }
  } else {
    next();
  }
}

export default authMiddleware;
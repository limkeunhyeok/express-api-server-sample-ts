import { Handler, Request, Response, NextFunction } from "express";

export const wrap = (handler: Handler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await handler(req, res, next);
      res.json(response);
      next();
    } catch (err) {
      next(err);
    }
  };
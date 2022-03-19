import { Handler } from "express";
import { Response } from "./response";

export const wrap = (handler: Handler) =>
  async (req, res, next) => {
    try {
      const result = await handler(req, res, next);
      const response = new Response(true).data(result).toJson();
      res.json(response);
      next();
    } catch (err) {
      next(err);
    }
  };
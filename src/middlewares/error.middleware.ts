import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/http.exception";
import { logger } from "../lib/logger";
import { Response as HttpResponse } from "../lib/response";


const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || "Something went wrong";

    logger.error(`${req.method} ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    
    const response = new HttpResponse(false).error(message).toJson();
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
}

export default errorMiddleware;
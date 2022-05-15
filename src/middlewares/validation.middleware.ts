import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, RequestHandler } from "express";
import { BadRequestException } from "../common/exceptions";

export const getDataFromRequest = (req: Request): any => {
  const data = {
    ...req.query,
    ...req.body,
    ...req.params,
  };
  return data;
};

export const validationMiddleware = (
  type: any,
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
): RequestHandler => {
  return (req, res, next) => {
    const data = getDataFromRequest(req);

    validate(plainToClass(type, data), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) => Object.values(error.constraints))
          .join(", ");
        next(new BadRequestException(message));
      } else {
        next();
      }
    });
  };
};

import { NextFunction, Response } from "express";

import { Request } from "../interfaces/auth.interface";

import HttpStatusCodes from "http-status-codes";

import { UnauthenticatedError } from "../error/UnauthenticatedError";

import loggerWithNameSpace from "../utils/logger";
import { BadRequest } from "../error/BadRequest";
import { NotFoundError } from "../error/NotFoundError";

const logger = loggerWithNameSpace("ErrorHandler");

export function notFoundError(req: Request, res: Response) {
  return res.status(HttpStatusCodes.NOT_FOUND).json({
    message: "Route not found",
  });
}

export function genericErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.stack) {
    logger.error(error.stack);
  }

  if (error instanceof UnauthenticatedError) {
    return res.status(HttpStatusCodes.UNAUTHORIZED).json({
      message: error.message,
    });
  } else if (error instanceof BadRequest) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  } else if (error instanceof NotFoundError) {
    return res.status(HttpStatusCodes.NOT_FOUND).json({
      message: error.message,
    });
  }
  return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
  });
}

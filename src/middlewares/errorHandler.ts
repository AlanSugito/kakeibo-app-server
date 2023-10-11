import { NextFunction, Request, Response } from "express";
import { APIError } from "../utils";
import { IErrorResponse } from "../types";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response<IErrorResponse>,
  next: NextFunction
) => {
  if (err) {
    if (err instanceof APIError) {
      return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({ message: err.message });
  }

  next();
};

export default errorHandler;

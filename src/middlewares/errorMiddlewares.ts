import { NextFunction, Request, Response } from "express";
import BaseError from "../error";
import { Prisma } from "@prisma/client";

function errorMiddlewareAfterRoute(
  err: unknown,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  if (err instanceof BaseError) {
    return res.status(err.httpCode).json({ error: err });
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(500).json({ error: err.meta });
  }
  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    return res.status(500).json({ error: err.message });
  }
  const error = err as { message: string };
  return res.status(500).json({ error: error.message });
}

export default errorMiddlewareAfterRoute;

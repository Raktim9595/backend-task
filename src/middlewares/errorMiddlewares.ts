import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { HttpError } from "http-errors";

function errorMiddlewareAfterRoute(
  err: unknown,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      error: {
        status: err.status,
        message: err.message,
      },
    });
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(500).json({ error: err.meta });
  }
  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    return res.status(500).json({
      error: {
        message: err.message,
      },
    });
  }
  const error = err as { message: string };
  return res.status(500).json({ error: { message: error.message } });
}

export default errorMiddlewareAfterRoute;

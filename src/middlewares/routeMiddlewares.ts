import { Express, NextFunction, Request, Response } from "express";
import batteryRouter from "../routes/batteryRoutes";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";

export default function routeMiddlewares(app: Express) {
  app.use("/api/v1/battery", batteryRouter);

  // this is for handling route that doesn't exist
  app.use((_: Request, _res: Response, next: NextFunction) => {
    const error = new createHttpError[StatusCodes.NOT_FOUND](
      "API route not found"
    );
    next(error);
  });
}

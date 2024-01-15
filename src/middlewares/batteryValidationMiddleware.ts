import { NextFunction, Request, Response } from "express";
import { IPostOneBatteryReq } from "../interfaces/battery";
import { batteryReqSchema } from "../validationSchemas/batteryReqValidator";

async function validateOneBatteryReq(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, postCode, totalWatt } = req.body;
    console.log("validation middlewares");
    const validateOneBatteryReq = await batteryReqSchema.validateAsync({
      name,
      postCode,
      totalWatt,
    });
    console.log(validateOneBatteryReq);
    next();
  } catch (err) {
    next(err);
  }
}

const BatteryValidatorMiddleware = { validateOneBatteryReq };
export default BatteryValidatorMiddleware;

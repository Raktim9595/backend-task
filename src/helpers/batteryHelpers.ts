import { Battery } from "@prisma/client";
import { IBatteriesReq } from "../interfaces/battery";
import { IFilter, Operators } from "../interfaces/filters";
import {
  betweenFilterValidationSchema,
  containsBatteryFilterValidationSchema,
} from "../validationSchemas/filterValidator";
import Joi from "joi";

export const prepareBatteryListForPost = (
  batteries: Array<IBatteriesReq>
): Omit<Battery, "id">[] => {
  const postBatteries = batteries.map((battery) => ({
    ...battery,
    postCode: parseInt(battery.postCode),
    totalWatt: Number(battery.totalWatt),
  }));

  return postBatteries;
};

export const globalValidationPayload = (
  toBeValidatedObject: object,
  validationSchema: Joi.ObjectSchema
) => {
  let isValid = true;
  const result = validationSchema!.validate(toBeValidatedObject);
  if (result.error) {
    isValid = false;
  }
  return isValid;
};

export const validateBatteryFilters = (
  filters: Array<Partial<IFilter<Operators>>>
) => {
  let isValid = true;
  filters.forEach((filter) => {
    if (filter?.operator === "BETWEEN") {
      const result = betweenFilterValidationSchema.validate(filter);
      if (result.error) {
        isValid = false;
      }
    } else {
      const result = containsBatteryFilterValidationSchema.validate(filter);
      if (result.error) {
        isValid = false;
      }
    }
  });
  return isValid;
};

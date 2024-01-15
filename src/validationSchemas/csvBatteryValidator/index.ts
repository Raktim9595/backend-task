import Joi from "joi";

export const csvBatterySchema = Joi.object({
  name: Joi.string().required(),
  postCode: Joi.number().required(),
  totalWatt: Joi.number().required(),
});

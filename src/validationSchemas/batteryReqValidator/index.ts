import Joi from "joi";

export const batteryReqSchema = Joi.object({
  name: Joi.string().required(),
  postCode: Joi.number().required(),
  totalWatt: Joi.number().required(),
}).options({
  convert: false,
});

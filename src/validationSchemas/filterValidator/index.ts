import Joi from "joi";

export const betweenFilterValidationSchema = Joi.object({
  key: Joi.string().required(),
  operator: Joi.string().required(),
  value: {
    value_from: Joi.number().required(),
    value_to: Joi.number().required(),
  },
}).options({
  convert: false,
});

export const containsBatteryFilterValidationSchema = Joi.object({
  key: Joi.string().required(),
  operator: Joi.string().required(),
  value: Joi.string().required(),
});

export const generalMultipleResValidation = Joi.object({
  pageNumber: Joi.number().required(),
  pageSize: Joi.number().required(),
});

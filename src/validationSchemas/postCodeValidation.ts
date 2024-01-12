import * as yup from "yup";

export const postCodeValidation = yup.object({
	value_from: yup.string().required().matches(/^\d+$/, "Only digits are allowed"),
	value_to: yup.string().required().matches(/^\d+$/, "Only digits are allowed"),
});

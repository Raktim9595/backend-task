import * as yup from "yup";

export const batteryValidationSchema = yup.object({
	name: yup.string().required("battery name is required"),
	postCode: yup
		.string()
		.required("postCode is required")
		.matches(/^\d+$/, "Only digits are allowed"),
	totalWatt: yup
		.string()
		.required("totalWatt is required")
		.matches(/^\d+$/, "Only digits are allowed"),
});

export const batteryArrayValidationSchema = yup.object({
	batteries: yup
		.array()
		.of(batteryValidationSchema)
		.required("please provide at least one battery"),
});

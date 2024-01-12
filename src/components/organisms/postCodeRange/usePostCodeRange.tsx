import { useForm, SubmitHandler } from "react-hook-form";
import { IPostcodeRange, IPostcodeRangeProps } from "./postCodeRange.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { postCodeValidation } from "@/validationSchemas/postCodeValidation";

export const usePostCodeRangeHooks = (props: IPostcodeRangeProps) => {
	const { handleSubmit, control } = useForm<IPostcodeRange>({
		resolver: yupResolver(postCodeValidation),
		defaultValues: {
			value_from: "",
			value_to: "",
		},
	});
	const onSubmit: SubmitHandler<IPostcodeRange> = (data) => {
		props.onFilterClicked({ key: "postCode", operator: "BETWEEN", value: data });
	};

	const filterClicked = () => {
		handleSubmit(onSubmit)();
	};

	return {
		handleSubmit,
		onSubmit,
		filterClicked,
		control,
	};
};

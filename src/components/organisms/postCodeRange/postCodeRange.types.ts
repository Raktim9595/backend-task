import { IFilter } from "@/interfaces/filterAndSorts";
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

export interface IPostcodeRange {
	value_from: string;
	value_to: string;
}

export interface IPostcodeRangeHooks {
	register: UseFormRegister<IPostcodeRange>;
	handleSubmit: UseFormHandleSubmit<IPostcodeRange, undefined>;
	onSubmit: SubmitHandler<IPostcodeRange>;
}

export interface IPostcodeRangeProps {
	onFilterClicked: (filter: IFilter) => void;
}

import { TextFieldProps } from "@mui/material";
import { Control, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";

export interface IReactHookFormTextField<TFieldValues extends FieldValues> {
	name: FieldPath<TFieldValues>;
	control: Control<TFieldValues>;
	rules?: RegisterOptions;
	muiProps?: TextFieldProps;
}

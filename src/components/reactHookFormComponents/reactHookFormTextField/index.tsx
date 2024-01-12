import { Controller, FieldValues } from "react-hook-form";
import { IReactHookFormTextField } from "./reactHookFormTextField.types";
import { TextField } from "@mui/material";

const ReactHookFormTextField = <TFieldValue extends FieldValues>(
	props: IReactHookFormTextField<TFieldValue>,
) => {
	const { name, control, rules, muiProps } = props;

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field, fieldState: { error } }) => (
				<TextField {...field} error={!!error} {...muiProps} helperText={error?.message} />
			)}
		/>
	);
};

export default ReactHookFormTextField;

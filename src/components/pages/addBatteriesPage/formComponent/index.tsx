import ReactHookFormTextField from "@/components/reactHookFormComponents/reactHookFormTextField";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { IBatteryPageViewProps } from "../addBatteries.types";
import { DeleteOutline } from "@mui/icons-material";

const AddBatterySingleForm = (props: IBatteryPageViewProps & { index: number }) => {
	const { control, index, errors, remove } = props;
	return (
		<Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
			<Stack direction={"row"} alignItems={"center"} gap={"1rem"}>
				<Typography variant="h6">Battery {index + 1}</Typography>
				{index !== 0 && (
					<IconButton onClick={() => remove(index)} size="small">
						<DeleteOutline fontSize="small" />
					</IconButton>
				)}
			</Stack>
			<Box sx={{ display: "flex", alignItems: "flex-start", gap: "1rem", width: "100%" }}>
				<ReactHookFormTextField
					control={control}
					name={`batteries.${index}.name`}
					muiProps={{
						placeholder: "enter battery name",
						size: "small",
						fullWidth: true,
						error: !!errors.batteries?.[index]?.name,
						helperText: errors.batteries?.[index]?.name?.message,
					}}
				/>
				<ReactHookFormTextField
					control={control}
					name={`batteries.${index}.postCode`}
					muiProps={{
						placeholder: "enter post code",
						size: "small",
						fullWidth: true,
						error: !!errors.batteries?.[index]?.postCode,
						helperText: errors.batteries?.[index]?.postCode?.message,
					}}
				/>
				<ReactHookFormTextField
					control={control}
					name={`batteries.${index}.totalWatt`}
					muiProps={{
						placeholder: "enter total watt",
						size: "small",
						fullWidth: true,
						error: !!errors.batteries?.[index]?.totalWatt,
						helperText: errors.batteries?.[index]?.totalWatt?.message,
					}}
				/>
			</Box>
		</Box>
	);
};

export default AddBatterySingleForm;

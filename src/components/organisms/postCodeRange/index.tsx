import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { IPostcodeRangeProps } from "./postCodeRange.types";
import { usePostCodeRangeHooks } from "./usePostCodeRange";
import ReactHookFormTextField from "@/components/reactHookFormComponents/reactHookFormTextField";

const PostCodeRange = (props: IPostcodeRangeProps) => {
	const { filterClicked, control } = usePostCodeRangeHooks(props);

	return (
		<Box
			component={"form"}
			onSubmit={(e) => {
				e.preventDefault();
				filterClicked();
			}}
		>
			<Typography> Post code range : </Typography>
			<Box
				component={"div"}
				sx={{
					display: "flex",
					alignItems: "flex-start",
					gap: "1rem",
				}}
			>
				<ReactHookFormTextField
					name="value_from"
					control={control}
					muiProps={{
						size: "small",
						variant: "outlined",
						placeholder: "from",
					}}
				/>
				<ReactHookFormTextField
					name="value_to"
					control={control}
					muiProps={{
						size: "small",
						variant: "outlined",
						placeholder: "to",
					}}
				/>
				<Button type="submit" variant="contained" size="small" sx={{ px: "1.5rem" }}>
					Filter
				</Button>
			</Box>
		</Box>
	);
};

export default PostCodeRange;

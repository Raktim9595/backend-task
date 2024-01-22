import { CloudUpload } from "@mui/icons-material";
import { Button, styled } from "@mui/material";
import React from "react";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

interface Props {
	changeFileData: (file?: File) => void;
	disabled: boolean;
}

const UploadFileButton = (props: Props) => {
	return (
		<Button
			disabled={props.disabled}
			component="label"
			variant="contained"
			startIcon={<CloudUpload />}
		>
			Upload file
			<VisuallyHiddenInput
				onChange={(e) => {
					if (!e.target.files) return;
					props.changeFileData(e.target.files[0]);
				}}
				type="file"
			/>
		</Button>
	);
};

export default UploadFileButton;

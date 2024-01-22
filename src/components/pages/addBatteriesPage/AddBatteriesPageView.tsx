import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { IBatteryPageViewProps } from "./addBatteries.types";
import UploadFileButton from "@/components/molecules/uploadFileButton";

const AddBatteriesPageView = (props: IBatteryPageViewProps) => {
	const { changeFileData, file } = props;
	return (
		<Box
			component={"section"}
			sx={{
				height: "100%",
				maxWidth: "1100px",
				margin: "0 auto",
				p: "2rem",
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
			}}
		>
			{/* form  */}
			<Box
				sx={{
					flexGrow: 1,
					borderRadius: "0.5rem",
					border: "2px solid #E0E0E0",
					display: "flex",
					flexDirection: "column",
					overflowY: "auto",
					width: "100%",
				}}
			>
				<Box
					component={"div"}
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: "0.75rem",
						p: "1rem 1.5rem",
						overflowY: "auto",
						alignItems: "center",
						justifyContent: "center",
						flex: 1,
					}}
				>
					<Box>
						<UploadFileButton disabled={!!file} changeFileData={changeFileData} />
					</Box>
					<Box height={"2rem"}>{file && <Typography>{file.name}</Typography>}</Box>
				</Box>
			</Box>

			{/* save button  */}
			<Box sx={{ height: "2rem", flexShrink: 0 }}>
				<Button
					type="button"
					onClick={props.postBatteriesToDatabase}
					variant="contained"
					color="success"
					sx={{ width: "5rem" }}
				>
					Save
				</Button>
			</Box>
		</Box>
	);
};

export default AddBatteriesPageView;

import { Box, Button, Typography } from "@mui/material";
import React from "react";
import AddBatterySingleForm from "./formComponent";
import { IBatteryPageViewProps } from "./addBatteries.types";
import { Add } from "@mui/icons-material";

const AddBatteriesPageView = (props: IBatteryPageViewProps) => {
	const { fields, append } = props;
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
						alignItems: "flex-end",
						flex: 1,
						p: "1rem 1.5rem",
						overflowY: "auto",
					}}
				>
					{fields.map((field, index) => (
						<AddBatterySingleForm key={field.id} index={index} {...props} />
					))}
				</Box>

				{/* add more button  */}
				<Button
					startIcon={<Add />}
					onClick={() =>
						append({
							name: "",
							postCode: "",
							totalWatt: "",
						})
					}
					sx={{
						width: "max-content",
						alignSelf: "flex-end",
						height: "2.5rem",
						flexShrink: 0,
						m: "0.5rem 1.5rem",
					}}
				>
					Add More
				</Button>
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

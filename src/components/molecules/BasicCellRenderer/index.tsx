import { Typography } from "@mui/material";
import { ICellRendererParams } from "ag-grid-community";
import React from "react";

const BasicCellRenderer = (props: ICellRendererParams) => {
	const { value } = props;

	return (
		<Typography variant="body2" display={"flex"} alignItems={"center"} height={"100%"}>
			{value}
		</Typography>
	);
};

export default BasicCellRenderer;

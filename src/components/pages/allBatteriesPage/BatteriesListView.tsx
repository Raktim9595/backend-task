import { Box } from "@mui/material";
import React from "react";
import { IBatteriesListPage } from "./allBatteriesPage.types";
import BatteryTable from "./batteryTable";
import PostCodeRange from "@/components/organisms/postCodeRange";

const BatteriesListView = (props: IBatteriesListPage) => {
	const { allBatteries, changeFilters, ...rest } = props;
	return (
		<Box component={"section"} height={"100%"} width={"100%"} padding={"1rem 2rem"}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
					alignItems: "flex-start",
					maxWidth: "1100px",
					margin: "0 auto",
				}}
			>
				<Box
					component={"div"}
					sx={{
						display: "flex",
						alignItems: "center",
						gap: "1rem",
						width: "100%",
					}}
				>
					<PostCodeRange onFilterClicked={changeFilters} />
				</Box>
				<BatteryTable allBatteries={allBatteries!} {...rest} />
			</Box>
		</Box>
	);
};

export default BatteriesListView;

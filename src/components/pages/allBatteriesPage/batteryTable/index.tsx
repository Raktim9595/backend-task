import CustomTable from "@/components/organisms/table";
import { Box, TablePagination } from "@mui/material";
import React from "react";
import { batteryColDefs } from "./columns";
import { IBattery } from "@/interfaces/battery";
import { IPagination } from "@/interfaces/pagination";

interface IBatteryTable {
	allBatteries: IBattery[];
	handleChangePage: (newPage: number) => void;
	handleChangeRowsPerPage: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
	pagination: IPagination;
}

const BatteryTable = (props: IBatteryTable) => {
	const { allBatteries, handleChangePage, handleChangeRowsPerPage, pagination } = props;

	return (
		<Box component={"section"} width={"100%"}>
			<Box height={"400px"} width={"100%"} margin={"0 auto"}>
				<CustomTable rowData={allBatteries} columnDef={batteryColDefs} />
			</Box>
			<TablePagination
				component="div"
				count={pagination.totalElements}
				page={pagination.page}
				onPageChange={(_, newPage) => handleChangePage(newPage)}
				rowsPerPage={pagination.pageSize}
				onRowsPerPageChange={handleChangeRowsPerPage}
				rowsPerPageOptions={[2, 4, 6, 8, 10]}
			/>
		</Box>
	);
};

export default BatteryTable;

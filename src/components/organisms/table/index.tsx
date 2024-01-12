import { Box } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import React from "react";
import { ICustomTable } from "./table.types";

const CustomTable = <T extends object>(props: ICustomTable<T>) => {
  const {
    columnDef,
    rowData,
    headerHeight = 48,
    rowHeight = 40,
    defaultColumnDef,
  } = props;
  return (
    <Box
      component={"section"}
      className="ag-theme-quartz"
      sx={{ height: "100%", width: "100%" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDef}
        headerHeight={headerHeight}
        rowHeight={rowHeight}
        pagination={false}
        suppressPaginationPanel={true}
        defaultColDef={defaultColumnDef}
        rowSelection="multiple"
      />
    </Box>
  );
};

export default CustomTable;

import BasicCellRenderer from "@/components/molecules/BasicCellRenderer";
import { CustomHeader } from "@/components/molecules/customHeader";
import { IBattery } from "@/interfaces/battery";
import { ColDef } from "ag-grid-community";

export const batteryColDefs: ColDef<IBattery>[] = [
  {
    checkboxSelection: true,
    headerCheckboxSelection: true,
    headerComponent: CustomHeader,
    headerComponentParams: {
      headerContent: "Battery Name",
    },
    field: "name",
    cellRenderer: BasicCellRenderer,
    flex: 1,
  },
  {
    headerComponent: CustomHeader,
    headerComponentParams: {
      headerContent: "Post Code",
    },
    field: "postCode",
    cellRenderer: BasicCellRenderer,
    flex: 1,
  },
  {
    headerComponent: CustomHeader,
    headerComponentParams: {
      headerContent: "Total Watt",
    },
    field: "totalWatt",
    cellRenderer: BasicCellRenderer,
    flex: 1,
  },
  {
    headerComponent: CustomHeader,
    headerComponentParams: {
      headerContent: "Average Watt",
    },
    field: "averageWatt",
    cellRenderer: BasicCellRenderer,
    flex: 1,
  },
];

import { ColDef } from "ag-grid-community";

export interface ICustomTable<T extends object> {
  rowData: T[];
  columnDef: ColDef<T>[];
  rowHeight?: number;
  headerHeight?: number;
  defaultColumnDef?: ColDef<T>;
}

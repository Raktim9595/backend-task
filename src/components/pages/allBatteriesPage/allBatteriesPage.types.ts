import { IBattery } from "@/interfaces/battery";
import { IFilter } from "@/interfaces/filterAndSorts";
import { IPagination } from "@/interfaces/pagination";

export interface IRequestParamsType {
	filters?: IFilter[];
	pageNumber: number;
	pageSize: number;
}

export const initialBatteriesRequestParams: IRequestParamsType = {
	filters: [],
	pageNumber: 0,
	pageSize: 20,
};

export interface IBatteriesListPage {
	allBatteries?: Array<IBattery>;
	handleChangePage: (newPage: number) => void;
	handleChangeRowsPerPage: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
	pagination: IPagination;
	changeFilters: (filter: IFilter) => void;
	isSuccess: boolean;
}

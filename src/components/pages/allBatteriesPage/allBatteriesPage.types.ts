import { IBattery } from "@/interfaces/battery";
import { Filter, Operators } from "@/interfaces/filterAndSorts";
import { IPagination } from "@/interfaces/pagination";

export interface IRequestParamsType<T extends Operators> {
	filter?: Filter<T> | object;
	pageNumber: number;
	pageSize: number;
}

export interface IBatteriesListPage {
	allBatteries?: Array<IBattery>;
	handleChangePage: (newPage: number) => void;
	handleChangeRowsPerPage: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
	pagination: IPagination;
	changeFilters: (filter: Filter<Operators>) => void;
}

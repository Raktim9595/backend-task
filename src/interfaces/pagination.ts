export interface IPagination {
	page: number;
	pageSize: number;
	totalElements: number;
}

export const paginationInitalState: IPagination = {
	page: 100,
	pageSize: 20,
	totalElements: 0,
};

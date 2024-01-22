export type IBattery = {
	id: string;
	name: string;
	totalWatt: number;
	postCode: number;
	averageWatt: number;
};

export type IBatteryRes = {
	content: Array<IBattery>;
	numberOfElementsInPage: number;
	pageNumber: number;
	pageSize: number;
	totalElements: number;
};

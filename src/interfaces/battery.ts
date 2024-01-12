import { AxiosResponse } from "axios";

export interface IBattery {
	id: string;
	name: string;
	totalWatt: number;
	postCode: number;
	averageWatt: string;
}

export interface IBatteryRes extends AxiosResponse {
	data: {
		content: Array<IBattery>;
		numberOfElementsInPage: number;
		pageNumber: number;
		pageSize: number;
		totalElements: number;
	};
}

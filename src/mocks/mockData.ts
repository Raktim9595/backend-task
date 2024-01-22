import { IBatteryRes } from "@/interfaces/battery";
import { AxiosError } from "axios";

export const mockedBatteryRes: Partial<IBatteryRes> = {
	content: [
		{
			id: "one",
			averageWatt: 100,
			name: "battery one",
			postCode: 1010,
			totalWatt: 200,
		},
	],
	numberOfElementsInPage: 0,
	pageNumber: 10,
	pageSize: 0,
	totalElements: 10,
};

export const mockBatterPostSuccessRes = {
	createdBatteries: {
		count: 3,
	},
};

export const mockFailedPostBatteryResponse = {
	response: {
		data: {
			error: {
				message: "something went wrong",
				status: 406,
			},
		},
	},
};

import { IRequestParamsType } from "@/components/pages/allBatteriesPage/allBatteriesPage.types";
import { baseRequest } from "./base";
import { IBattery, IBatteryRes } from "@/interfaces/battery";
import { AxiosResponse } from "axios";

export const getAllBatteries = async (body: IRequestParamsType): Promise<IBatteryRes> => {
	const response: AxiosResponse<IBatteryRes> = await baseRequest.post("/battery", body);
	return response.data;
};

export const postListOfBatteries = async (body: Omit<IBattery, "averageWatt" | "id">[]) => {
	return await baseRequest.post("/battery/addMany", body);
};

export const postBatteryCsv = async (body: FormData) => {
	const response: AxiosResponse = await baseRequest.post("/battery/file", body);
	return response.data;
};

const BatteryController = { getAllBatteries, postListOfBatteries, postBatteryCsv };
export default BatteryController;

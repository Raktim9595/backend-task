import { IRequestParamsType } from "@/components/pages/allBatteriesPage/allBatteriesPage.types";
import { baseRequest } from "./base";
import { Operators } from "@/interfaces/filterAndSorts";
import { IBattery, IBatteryRes } from "@/interfaces/battery";

const getAllBatteries = async (body: IRequestParamsType<Operators>): Promise<IBatteryRes> => {
	return await baseRequest.post("/battery", body);
};

const postListOfBatteries = async (body: Omit<IBattery, "averageWatt" | "id">[]) => {
	return await baseRequest.post("/battery/addMany", body);
};

const BatteryController = { getAllBatteries, postListOfBatteries };
export default BatteryController;

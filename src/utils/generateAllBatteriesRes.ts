import { Battery } from "@prisma/client";
import { calculateAverageBattery } from "./averageBatteryCalculate";
import { IMultipleBatteryResponse } from "../interfaces/battery";

export interface IGenerateBatteriesResHelper {
  allBatteries: Array<Battery>;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
}

export function generateAllBatteriesRes(
  props: IGenerateBatteriesResHelper
): IMultipleBatteryResponse {
  const { allBatteries, pageNumber, pageSize, totalElements } = props;
  const allBatteriesResponse: IMultipleBatteryResponse = {
    content:
      allBatteries?.map((battery) => ({
        ...battery,
        averageWatt: Number(
          calculateAverageBattery(battery.totalWatt).toFixed(2)
        ),
      })) ?? [],
    numberOfElementsInPage: allBatteries?.length ?? 0,
    pageNumber,
    pageSize,
    totalElements,
  };
  return allBatteriesResponse;
}

import { NextFunction, Response } from "express";
import {
  IGetAllBatteries,
  IGetBatteryId,
  IMultipleBatteryResponse,
  IOneBatteryResponse,
  IPostMultipleBatteriesReq,
  IPostOneBatteryReq,
} from "interfaces/battery";
import BatteryService from "../services/battery.services";
import { calculateAverageBattery } from "../utils/averageBatteryCalculate";
import { generateFilters } from "../utils/generateFilters";

async function getBatteryById(
  req: IGetBatteryId,
  res: Response<IOneBatteryResponse>,
  next: NextFunction
) {
  const { id } = req.params;
  const battery = await BatteryService.findById(id, next);
  if (!battery) return;
  const foundBattery: IOneBatteryResponse = {
    content: {
      ...battery,
      averageWatt: calculateAverageBattery(battery.totalWatt),
    },
  };
  return res.status(200).json(foundBattery);
}

async function getallBatteries(
  req: IGetAllBatteries,
  res: Response<IMultipleBatteryResponse>,
  next: NextFunction
) {
  const filter = generateFilters(req.body.filter);
  const { pageNumber, pageSize } = req.body;
  const batteries = await BatteryService.findAll(
    {
      filter,
      pageNumber,
      pageSize,
    },
    next
  );
  const foundBatteries: IMultipleBatteryResponse = {
    content:
      batteries?.map((battery) => ({
        ...battery,
        averageWatt: calculateAverageBattery(battery.totalWatt),
      })) ?? [],
  };
  if (batteries) {
    return res.status(200).json(foundBatteries);
  }
}

async function postMultipleBatteries(
  req: IPostMultipleBatteriesReq,
  res: Response,
  next: NextFunction
) {
  const listOfBatteries = req.body;
  const createdBatteries = await BatteryService.postMultipleBatteries(
    listOfBatteries,
    next
  );
  return res.status(201).json({ createdBatteries });
}

async function postOneBattery(
  req: IPostOneBatteryReq,
  res: Response,
  next: NextFunction
) {
  const battery = req.body;
  const createdBattery = await BatteryService.createOne(battery, next);
  return res.status(201).json({ createdBattery });
}

async function deleteById(
  req: IGetBatteryId,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const deletedBattery = await BatteryService.deleteById(id, next);
  return res.status(200).json({ deletedBattery });
}

export default {
  getBatteryById,
  getallBatteries,
  postMultipleBatteries,
  postOneBattery,
  deleteById,
};

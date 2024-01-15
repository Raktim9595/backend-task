import { NextFunction, Request, Response } from "express";

import CreateHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import BatteryService from "../services/battery.services";
import { calculateAverageBattery } from "../utils/averageBatteryCalculate";
import { generateFilters } from "../utils/generateFilters";
import { parseCsv } from "../utils/csv";
import { prepareBatteryListForPost } from "../helpers/batteryHelpers";
import { ERROR_FILE_REASON } from "../enums/errorMessage/fileErrorMessage";
import {
  IBatteriesReq,
  IGetAllBatteries,
  IGetBatteryId,
  IMultipleBatteryResponse,
  IOneBatteryResponse,
  IPostMultipleBatteriesReq,
  IPostOneBatteryReq,
} from "interfaces/battery";

async function getBatteryById(
  req: IGetBatteryId,
  res: Response<IOneBatteryResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const battery = await BatteryService.findById(id);
    if (!battery) return;
    const foundBattery: IOneBatteryResponse = {
      content: {
        ...battery,
        averageWatt: calculateAverageBattery(battery!.totalWatt),
      },
    };
    return res.status(StatusCodes.OK).json(foundBattery);
  } catch (err) {
    next(err);
  }
}

async function getallBatteries(
  req: IGetAllBatteries,
  res: Response<IMultipleBatteryResponse>,
  next: NextFunction
) {
  try {
    const filter = generateFilters(req.body.filter);
    const { pageNumber, pageSize } = req.body;
    const batteries = await BatteryService.findAll({
      filter,
      pageNumber,
      pageSize,
    });
    return res.status(StatusCodes.OK).json(batteries);
  } catch (err) {
    next(err);
  }
}

async function postMultipleBatteries(
  req: IPostMultipleBatteriesReq,
  res: Response,
  next: NextFunction
) {
  try {
    const listOfBatteries = req.body;
    const createdBatteries =
      await BatteryService.postMultipleBatteries(listOfBatteries);
    return res.status(StatusCodes.CREATED).json({ createdBatteries });
  } catch (err) {
    next(err);
  }
}

async function postBatteryCsv(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file)
      throw new CreateHttpError[StatusCodes.BAD_REQUEST](
        ERROR_FILE_REASON.EMPTY_FILE
      );

    // get array of batteries from csv file
    const results = (await parseCsv(req.file.path)) as IBatteriesReq[];

    // preparing the list of battery so that we can pass it to ORM
    const batteriesListForDatabaseAdd = prepareBatteryListForPost(results);

    const createdBatteries = await BatteryService.postMultipleBatteries(
      batteriesListForDatabaseAdd
    );
    res.status(StatusCodes.CREATED).json({
      createdBatteries,
    });
  } catch (err) {
    next(err);
  }
}

async function postOneBattery(
  req: IPostOneBatteryReq,
  res: Response,
  next: NextFunction
) {
  try {
    const battery = req.body;
    const createdBattery = await BatteryService.createOne(battery);
    return res.status(StatusCodes.CREATED).json({ createdBattery });
  } catch (err) {
    next(err);
  }
}

async function deleteById(
  req: IGetBatteryId,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const deletedBattery = await BatteryService.deleteById(id);
    return res.status(StatusCodes.OK).json({ deletedBattery });
  } catch (err) {
    next(err);
  }
}

export default {
  getBatteryById,
  getallBatteries,
  postMultipleBatteries,
  postOneBattery,
  deleteById,
  postBatteryCsv,
};

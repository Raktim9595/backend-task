import { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import BatteryService from "../services/battery.services";
import { generateFilters } from "../utils/generateFilters";
import { parseCsv } from "../utils/csv";
import {
  prepareBatteryListForPost,
  validateBatteryFilters,
  globalValidationPayload,
} from "../helpers/batteryHelpers";
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

import { ctx } from "../../context";
import { GLOBAL_ERR_MSGS } from "../enums/errorMessage/globalErrorMessage";
import { ERROR_BATTERY_REASON } from "../enums/errorMessage/batteryErrorMessage";
import { batteryReqSchema } from "../validationSchemas/batteryReqValidator";

async function getBatteryById(
  req: IGetBatteryId,
  res: Response<IOneBatteryResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const battery = await BatteryService.findById(id, ctx);
    return res.status(StatusCodes.OK).json({
      content: battery,
    });
  } catch (err) {
    next(err);
  }
}

async function getallBatteries(
  req: Partial<IGetAllBatteries>,
  res: Response<IMultipleBatteryResponse>,
  next: NextFunction
) {
  try {
    // checking if the req body was uploaded or not
    if (!req.body?.filters)
      throw new createHttpError[StatusCodes.BAD_REQUEST](
        ERROR_BATTERY_REASON.NOT_UPLOADED
      );

    // validating the filters
    const isValid = validateBatteryFilters(req.body!.filters);
    if (!isValid)
      throw new createHttpError[StatusCodes.BAD_REQUEST](
        GLOBAL_ERR_MSGS.INVALID_PAYLOAD
      );

    // generating filters from req body
    const filters = req.body.filters.map((filter) => generateFilters(filter));
    const { pageNumber, pageSize } = req.body;
    const batteries = await BatteryService.findAll(
      {
        filters,
        pageNumber,
        pageSize,
      },
      ctx
    );
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
    const createdBatteries = await BatteryService.postMultipleBatteries(
      listOfBatteries,
      ctx
    );
    return res.status(StatusCodes.CREATED).json({ createdBatteries });
  } catch (err) {
    next(err);
  }
}

async function postBatteryCsv(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file)
      throw new createHttpError[StatusCodes.BAD_REQUEST](
        ERROR_FILE_REASON.EMPTY_FILE
      );

    // get array of batteries from csv file
    const results = (await parseCsv(req.file.path)) as IBatteriesReq[];

    // preparing the list of battery so that we can pass it to ORM
    const batteriesListForDatabaseAdd = prepareBatteryListForPost(results);

    const createdBatteries = await BatteryService.postMultipleBatteries(
      batteriesListForDatabaseAdd,
      ctx
    );
    res.status(StatusCodes.CREATED).json({
      createdBatteries,
    });
  } catch (err) {
    next(err);
  }
}

async function postOneBattery(
  req: Partial<IPostOneBatteryReq>,
  res: Response,
  next: NextFunction
) {
  try {
    const battery = req.body;
    // throw error upon empty objects
    const isValidated = globalValidationPayload(battery!, batteryReqSchema);
    if (!isValidated)
      throw new createHttpError[StatusCodes.BAD_REQUEST](
        GLOBAL_ERR_MSGS.INVALID_PAYLOAD
      );
    const createdBattery = await BatteryService.createOne(battery!, ctx);
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
    const deletedBattery = await BatteryService.deleteById(id, ctx);
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

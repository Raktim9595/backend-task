import { Battery } from "@prisma/client";
import { Request } from "express";
import { Filter } from "./filters";

export interface IGetBatteryId extends Request {
  params: {
    id: string;
  };
}

export interface IPostMultipleBatteriesReq extends Request {
  body: Array<Battery>;
}

export interface IPostOneBatteryReq extends Request {
  body: Battery;
}

export interface IGetAllBatteries extends Request {
  body: {
    pageNumber: string;
    pageSize: string;
    filter: Filter;
  };
}

export type IOneBatteryResponse = {
  content: Battery & {
    averageWatt: number;
  };
};

export type IMultipleBatteryResponse = {
  content: Array<
    Battery & {
      averageWatt: number;
    }
  >;
};

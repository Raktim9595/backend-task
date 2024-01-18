import { Battery } from "@prisma/client";
import { Request } from "express";
import { IFilter, Operators } from "./filters";

export interface IGetBatteryId extends Request {
  params: {
    id: string;
  };
}

export interface IPostMultipleBatteriesReq extends Request {
  body: Array<Omit<Battery, "id">>;
}

export interface IPostOneBatteryReq extends Request {
  body: Omit<Battery, "id">;
}

export interface IGetAllBatteries extends Request {
  body: {
    pageNumber: number;
    pageSize: number;
    filters: Array<IFilter<Operators>>;
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
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  numberOfElementsInPage: number;
};

export interface IBatteriesReq {
  name: string;
  postCode: string;
  totalWatt: string;
}

import { Battery, PrismaClient } from "@prisma/client";
import error from "../error/errorTypes";
import { NextFunction } from "express";
import { IGetAllServicesProps } from "../interfaces/pagination";
import { getPaginationParameters } from "../utils/pagination";
import { generateAllBatteriesRes } from "../utils/generateAllBateriesRes";

const prisma = new PrismaClient();

async function findById(id: string, next: NextFunction) {
  try {
    const battery = await prisma.battery.findUnique({
      where: {
        id,
      },
    });
    if (!battery) throw new error.API404Error("battery not found");
    return battery;
  } catch (err) {
    next(err);
  }
}

async function findAll(props: IGetAllServicesProps, next: NextFunction) {
  const { skip, take } = getPaginationParameters({
    pageNumber: props.pageNumber,
    pageSize: props.pageSize,
  });
  try {
    const allBatteries = await prisma.battery.findMany({
      orderBy: {
        name: "asc",
      },
      where: props.filter,
      skip,
      take,
    });
    if (!allBatteries) throw new error.API404Error("no any battery not found");

    const allBatteriesResponse = generateAllBatteriesRes({
      allBatteries,
      pageNumber: Number(props.pageNumber),
      pageSize: Number(props.pageSize),
      totalElements: await prisma.battery.count(),
    });
    return allBatteriesResponse;
  } catch (err) {
    next(err);
  }
}

async function postMultipleBatteries(
  batteries: Array<Battery>,
  next: NextFunction
) {
  try {
    const createdBatteries = await prisma.battery.createMany({
      data: batteries,
    });
    if (createdBatteries.count === 0)
      throw new error.API400Error("couldn't create battery");
    return createdBatteries;
  } catch (err) {
    next(err);
  }
}

async function createOne(battery: Battery, next: NextFunction) {
  try {
    const createdBattery = await prisma.battery.create({
      data: battery,
    });
    if (!createdBattery) throw new error.API400Error("couldn't create battery");
    return createdBattery;
  } catch (err) {
    next(err);
  }
}

async function deleteById(id: string, next: NextFunction) {
  try {
    const deletedBattery = await prisma.battery.delete({
      where: {
        id,
      },
    });
    if (!deletedBattery) throw new error.API404Error("battery not found");
    return deletedBattery;
  } catch (err) {
    next(err);
  }
}

export default {
  findAll,
  findById,
  postMultipleBatteries,
  createOne,
  deleteById,
};

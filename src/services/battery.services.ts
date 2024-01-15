import { Battery, PrismaClient } from "@prisma/client";
import { IGetAllServicesProps } from "../interfaces/pagination";
import { getPaginationParameters } from "../utils/pagination";
import { generateAllBatteriesRes } from "../utils/generateAllBateriesRes";
import CreateError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { ERROR_BATTERY_REASON } from "../enums/errorMessage/batteryErrorMessage";

const prisma = new PrismaClient();

async function findById(id: string) {
  const battery = await prisma.battery.findUnique({
    where: {
      id,
    },
  });
  if (!battery)
    throw new CreateError[StatusCodes.NOT_FOUND](
      ERROR_BATTERY_REASON.NOT_FOUND
    );
  return battery;
}

async function findAll(props: IGetAllServicesProps) {
  const { skip, take } = getPaginationParameters({
    pageNumber: props.pageNumber,
    pageSize: props.pageSize,
  });
  const allBatteries = await prisma.battery.findMany({
    orderBy: {
      name: "asc",
    },
    where: props.filter,
    skip,
    take,
  });
  if (!allBatteries)
    throw new CreateError[StatusCodes.NOT_FOUND](
      ERROR_BATTERY_REASON.LIST_NOT_FOUND
    );

  const allBatteriesResponse = generateAllBatteriesRes({
    allBatteries,
    pageNumber: Number(props.pageNumber),
    pageSize: Number(props.pageSize),
    totalElements: await prisma.battery.count(),
  });
  return allBatteriesResponse;
}

async function postMultipleBatteries(batteries: Array<Omit<Battery, "id">>) {
  const createdBatteries = await prisma.battery.createMany({
    data: batteries,
  });
  if (createdBatteries.count === 0)
    throw new CreateError[StatusCodes.INTERNAL_SERVER_ERROR](
      ERROR_BATTERY_REASON.COULD_NOT_POST
    );
  return createdBatteries;
}

async function createOne(battery: Omit<Battery, "id">) {
  const createdBattery = await prisma.battery.create({
    data: battery,
  });
  if (!createdBattery)
    throw new CreateError[StatusCodes.INTERNAL_SERVER_ERROR](
      ERROR_BATTERY_REASON.COULD_NOT_POST
    );
  return createdBattery;
}

async function deleteById(id: string) {
  const deletedBattery = await prisma.battery.delete({
    where: {
      id,
    },
  });
  if (!deletedBattery)
    throw new CreateError[StatusCodes.INTERNAL_SERVER_ERROR](
      ERROR_BATTERY_REASON.DELETE_FAILED
    );
  return deletedBattery;
}

export default {
  findAll,
  findById,
  postMultipleBatteries,
  createOne,
  deleteById,
};

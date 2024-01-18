import { Battery } from "@prisma/client";
import { IGetAllServicesProps } from "../interfaces/pagination";
import { getPaginationParameters } from "../utils/pagination";
import { generateAllBatteriesRes } from "../utils/generateAllBatteriesRes";
import CreateError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { ERROR_BATTERY_REASON } from "../enums/errorMessage/batteryErrorMessage";
import { Context } from "../../context";
import { calculateAverageBattery } from "../utils/averageBatteryCalculate";

async function findById(id: string, ctx: Context) {
  const battery = await ctx.prisma.battery.findUnique({
    where: {
      id,
    },
  });
  if (!battery)
    throw new CreateError[StatusCodes.NOT_FOUND](
      ERROR_BATTERY_REASON.NOT_FOUND
    );
  return {
    ...battery,
    averageWatt: calculateAverageBattery(battery!.totalWatt),
  };
}

async function findAll(props: IGetAllServicesProps, ctx: Context) {
  const { skip, take } = getPaginationParameters({
    pageNumber: props.pageNumber,
    pageSize: props.pageSize,
  });
  const allBatteries = await ctx.prisma.battery.findMany({
    orderBy: {
      name: "asc",
    },
    where: {
      AND: props.filters,
    },
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
    totalElements: await ctx.prisma.battery.count({
      where: {
        AND: props.filters,
      },
    }),
  });
  return allBatteriesResponse;
}

async function postMultipleBatteries(
  batteries: Array<Omit<Battery, "id">>,
  ctx: Context
) {
  const createdBatteries = await ctx.prisma.battery.createMany({
    data: batteries,
  });
  if (createdBatteries.count === 0)
    throw new CreateError[StatusCodes.INTERNAL_SERVER_ERROR](
      ERROR_BATTERY_REASON.COULD_NOT_POST
    );
  return createdBatteries;
}

async function createOne(battery: Omit<Battery, "id">, ctx: Context) {
  const createdBattery = await ctx.prisma.battery.create({
    data: battery,
  });
  if (!createdBattery)
    throw new CreateError[StatusCodes.INTERNAL_SERVER_ERROR](
      ERROR_BATTERY_REASON.COULD_NOT_POST
    );
  return createdBattery;
}

async function deleteById(id: string, ctx: Context) {
  const deletedBattery = await ctx.prisma.battery.delete({
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

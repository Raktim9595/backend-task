import { Battery } from "@prisma/client";
import { IBatteriesReq } from "../interfaces/battery";

export const prepareBatteryListForPost = (
  batteries: Array<IBatteriesReq>
): Omit<Battery, "id">[] => {
  const postBatteries = batteries.map((battery) => ({
    ...battery,
    postCode: parseInt(battery.postCode),
    totalWatt: Number(battery.totalWatt),
  }));

  return postBatteries;
};

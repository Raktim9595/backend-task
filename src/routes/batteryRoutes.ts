import { Router } from "express";
import BatteryControllers from "../controllers/battery.controllers";

const batteryRouter: Router = Router();

batteryRouter.get("/:id", BatteryControllers.getBatteryById);

batteryRouter.post("/", BatteryControllers.getallBatteries);

batteryRouter.post("/addMany", BatteryControllers.postMultipleBatteries);

batteryRouter.post("/add", BatteryControllers.postOneBattery);

batteryRouter.delete("/:id", BatteryControllers.deleteById);

export default batteryRouter;

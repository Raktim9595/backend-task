import { Router } from "express";
import BatteryControllers from "../controllers/battery.controllers";
import upload from "../utils/multer";

const batteryRouter: Router = Router();

batteryRouter.get("/:id", BatteryControllers.getBatteryById);

batteryRouter.post("/", BatteryControllers.getallBatteries);

batteryRouter.post("/addMany", BatteryControllers.postMultipleBatteries);

batteryRouter.post("/add", BatteryControllers.postOneBattery);

batteryRouter.delete("/:id", BatteryControllers.deleteById);

batteryRouter.post(
  "/file",
  upload.single("file"),
  BatteryControllers.postBatteryCsv
);

export default batteryRouter;

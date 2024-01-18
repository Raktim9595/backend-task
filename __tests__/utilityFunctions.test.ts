import { calculateAverageBattery } from "../src/utils/averageBatteryCalculate";
import {
  generateAllBatteriesRes,
  IGenerateBatteriesResHelper,
} from "../src/utils/generateAllBatteriesRes";

describe("Utility function", () => {
  describe("Average battery capacity calculator", () => {
    it("should return average capacity less than total capacity", () => {
      const totalCapacity = 200;
      const result = calculateAverageBattery(totalCapacity);
      expect(result).toBeLessThanOrEqual(totalCapacity);
      expect(result).toBeGreaterThanOrEqual(totalCapacity / 2);
    });
  });

  describe("Generate all batteries response helper", () => {
    it("should return an array of batteries containing average watt", () => {
      const params: IGenerateBatteriesResHelper = {
        allBatteries: [
          {
            id: "one",
            totalWatt: 200,
            name: "Battery One",
            postCode: 1010,
          },
          {
            id: "two",
            totalWatt: 220,
            name: "Battery Two",
            postCode: 1020,
          },
        ],
        pageNumber: 0,
        pageSize: 10,
        totalElements: 2,
      };
      const result = generateAllBatteriesRes(params);
      expect(Array.isArray(result.content)).toBe(true);
      expect(result.content).toHaveLength(params.allBatteries.length);
      result.content.forEach((battery) => {
        // check the validity of objects
        expect(typeof battery).toBe("object");

        // check whether the required field for battery are available or not
        expect(battery).toHaveProperty("averageWatt");
        expect(battery).toHaveProperty("totalWatt");
        expect(battery).toHaveProperty("id");
        expect(battery).toHaveProperty("name");
        expect(battery).toHaveProperty("postCode");
      });
    });
  });
});

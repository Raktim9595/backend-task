import { IBatteriesReq } from "../src/interfaces/battery";
import {
  prepareBatteryListForPost,
  globalValidationPayload,
  validateBatteryFilters,
} from "../src/helpers/batteryHelpers";
import { Battery } from "@prisma/client";
import { batteryReqSchema } from "../src/validationSchemas/batteryReqValidator";
import { IFilter, Operators } from "../src/interfaces/filters";

describe("Battery Helpers", () => {
  describe("prepare battery for post", () => {
    it("should return the battery array with post code and total Watt as number", () => {
      const batteries: IBatteriesReq[] = [
        {
          name: "apple",
          postCode: "100",
          totalWatt: "200",
        },
        {
          name: "battery two",
          postCode: "one",
          totalWatt: "two",
        },
      ];

      const result = prepareBatteryListForPost(batteries);
      expect(result).toHaveLength(batteries.length);
      result.forEach((batteryTransformed) => {
        expect(typeof batteryTransformed).toBe("object");
        expect(batteryTransformed).toHaveProperty("postCode");
        expect(batteryTransformed).toHaveProperty("name");
        expect(batteryTransformed).toHaveProperty("totalWatt");
        expect(typeof batteryTransformed.postCode).toBe("number");
        expect(typeof batteryTransformed.totalWatt).toBe("number");
      });
    });
  });

  describe("validate battery before post", () => {
    describe("given valid payload for battery creation", () => {
      it("should return true", () => {
        const validBattery: Partial<Battery> = {
          name: "Battery One",
          postCode: 200,
          totalWatt: 500,
        };

        const result = globalValidationPayload(validBattery, batteryReqSchema);
        expect(result).toBe(true);
      });
    });

    describe("given invalid payload", () => {
      it("should return false", () => {
        const invalidBattery = {
          name: "Battery One",
          postCode: "200",
          totalWatt: "200",
        };
        const result = globalValidationPayload(
          invalidBattery,
          batteryReqSchema
        );
        expect(result).toBe(false);
      });
    });
  });

  describe("validate battery filters", () => {
    describe("Given valid filters provided", () => {
      it("should return true", () => {
        const validFilters: Array<Partial<IFilter<Operators>>> = [
          {
            key: "name",
            operator: "BETWEEN",
            value: {
              value_from: 100,
              value_to: 200,
            },
          },
          {
            key: "postCode",
            operator: "CONTAINS",
            value: "apple",
          },
        ];

        const result = validateBatteryFilters(validFilters);
        expect(result).toBe(true);
      });
    });

    describe("Given invalid Filters", () => {
      const invalidFilters: Array<object> = [
        {
          key: "name",
          operator: "BETWEEN",
          value: {
            value_from: 100,
            value_to: "200",
          },
        },
        {
          key: "postCode",
          operator: "CONTAINS",
          value: "123",
        },
      ];

      const result = validateBatteryFilters(invalidFilters);
      expect(result).toBe(false);
    });
  });
});

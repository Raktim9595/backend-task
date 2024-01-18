import { IFilter } from "../src/interfaces/filters";
import { generateFilters } from "../src/utils/generateFilters";

describe("Generate Filter ", () => {
  describe("test for filter that return filter condition between two values", () => {
    it("should have gte and lte field", () => {
      const testFilter: IFilter<"BETWEEN"> = {
        key: "postCode",
        operator: "BETWEEN",
        value: {
          value_from: 1000,
          value_to: 1050,
        },
      };

      const result = generateFilters(testFilter);
      expect(typeof result).toBe("object");
      expect(result).toHaveProperty(testFilter.key);
      const res = result as { postCode: object };
      expect(typeof res.postCode).toBe("object");
      expect(res.postCode).toHaveProperty("gte");
      expect(res.postCode).toHaveProperty("lte");
    });
  });

  describe("given CONTAINS operator is passed in filter.OPERATOR", () => {
    it("should return with filter object with contains and mode=insensitive", () => {
      const testFilter: IFilter<"CONTAINS"> = {
        key: "name",
        operator: "CONTAINS",
        value: "batt",
      };

      const result = generateFilters(testFilter);
      expect(typeof result).toBe("object");
      expect(result).toHaveProperty(testFilter.key);
      const res = result as { name: object };
      expect(typeof res.name).toBe("object");
      expect(res.name).toHaveProperty("contains");
      expect(res.name).toHaveProperty("mode");
    });
  });

  describe("given equals operator is passed in filter.OPERATOR", () => {
    it("should return with filter object with equals property including inside it", () => {
      const testFilter: IFilter<"EQUAL"> = {
        key: "totalWatt",
        operator: "EQUAL",
        value: 220,
      };

      const result = generateFilters(testFilter);
      expect(typeof result).toBe("object");
      expect(result).toHaveProperty(testFilter.key);
      const res = result as { totalWatt: object };
      expect(typeof res.totalWatt).toBe("object");
      expect(res.totalWatt).toHaveProperty("equals");
    });
  });
});

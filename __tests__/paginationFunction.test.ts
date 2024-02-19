import { Pagination } from "../src/interfaces/pagination";
import { getPaginationParameters } from "../src/utils/pagination";
import _ from "lodash";

describe("pagination Function", () => {
  it("should return object containing how many elements to skip and how many elements to take in a page", () => {
    const pagination: Pagination = {
      pageNumber: 1,
      pageSize: 10,
    };

    const result = getPaginationParameters(pagination);
    expect(typeof result).toBe("object");
    expect(result).toHaveProperty("skip");
    expect(result).toHaveProperty("take");
    expect(result.take).toBe(pagination.pageSize ?? 10);
    expect(result.skip).toBe(_.multiply(result.take, pagination.pageNumber));
  });
});

import { StatusCodes } from "http-status-codes";
import { ERROR_FILE_REASON } from "../src/enums/errorMessage/fileErrorMessage";
import { parseCsv } from "../src/utils/csv";
import { HttpError } from "http-errors";

const filePath = "uploads\\file1705474000854.csv";
const errorFilePath = "uploads\\file1705473417428.csv";

describe("Csv Files", () => {
  describe("Given proper csv format and data", () => {
    it("should return array of data", async () => {
      const result = await parseCsv(filePath);
      expect(result).toHaveLength(3);
    });
  });

  describe("Given invalid headers are provided in csv format", () => {
    it(
      "should reject with error message: " + ERROR_FILE_REASON.NOT_ACCEPTABLE,
      async () => {
        await expect(parseCsv(errorFilePath)).rejects.toThrow(
          ERROR_FILE_REASON.NOT_ACCEPTABLE
        );
        try {
          await parseCsv(errorFilePath);
        } catch (error) {
          expect(error).toBeInstanceOf(HttpError);
          if (error instanceof HttpError) {
            expect(error.message).toBe(ERROR_FILE_REASON.NOT_ACCEPTABLE);
            expect(error.status).toBe(StatusCodes.NOT_ACCEPTABLE);
          }
        }
      }
    );
  });
});

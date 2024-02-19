import csvParser from "csv-parser";
import fs from "fs";
import { csvBatterySchema } from "../../validationSchemas/csvBatteryValidator";
import { validateHeader } from "./validateCsvHeaders";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { ERROR_FILE_REASON } from "../../enums/errorMessage/fileErrorMessage";

export const parseCsv = (filePath: string) => {
  console.log(filePath);
  return new Promise((resolve: (value: any[]) => void, reject) => {
    const results: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("headers", (headers) => {
        const isCsvFormatValid: boolean = validateHeader({
          foundHeaders: headers as Array<string>,
          expectedHeaders: ["name", "totalWatt", "postCode"],
        });
        if (!isCsvFormatValid) {
          reject(
            new createHttpError[StatusCodes.NOT_ACCEPTABLE](
              ERROR_FILE_REASON.NOT_ACCEPTABLE
            )
          );
        }
      })
      .on("data", async (data) => {
        try {
          const validatedData = await csvBatterySchema.validateAsync(data);
          results.push(validatedData);
        } catch (err) {
          reject(
            new createHttpError[StatusCodes.NOT_ACCEPTABLE](
              ERROR_FILE_REASON.NOT_ACCEPTABLE
            )
          );
        }
      })
      .on("end", () => resolve(results))
      .on("error", () =>
        reject(
          new createHttpError[StatusCodes.NOT_ACCEPTABLE](
            ERROR_FILE_REASON.NOT_ACCEPTABLE
          )
        )
      );
  });
};

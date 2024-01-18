import { StatusCodes } from "http-status-codes";
import { MockContext, createMockContext, Context } from "../context";
import { ERROR_BATTERY_REASON } from "../src/enums/errorMessage/batteryErrorMessage";
import batteryServices from "../src/services/battery.services";
import { HttpError } from "http-errors";
import { Prisma } from "@prisma/client";

let ctx: Context;
let mockCtx: MockContext;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

describe("Battery Service", () => {
  describe("In get one battery by id service", () => {
    describe("given proper id string", () => {
      it("should return a battery oject", async () => {
        const expectedBattery = {
          id: "65a77ea4e93fd7e61e7cf705",
          name: "battery 2",
          totalWatt: 200,
          postCode: 1002,
          averageWatt: 118.11,
        };
        const { averageWatt, ...rest } = expectedBattery;
        mockCtx.prisma.battery.findUnique.mockResolvedValue(rest);
        const batteryServiceResult = await batteryServices.findById(
          expectedBattery.id,
          ctx
        );
        expect(typeof batteryServiceResult).toBe("object");
      });
    });

    describe("given invalid id or no Id", () => {
      it("should reject promise with error message", async () => {
        mockCtx.prisma.battery.findUnique.mockResolvedValue(null);
        await expect(
          batteryServices.findById("invalid-id", ctx)
        ).rejects.toThrow(ERROR_BATTERY_REASON.NOT_FOUND);

        // checking status codes
        batteryServices.findById("invalid-id", ctx).catch((error) => {
          expect(error).toBeInstanceOf(HttpError);
          if (error instanceof HttpError) {
            expect(error.status).toBe(StatusCodes.NOT_FOUND);
          }
        });
      });
    });
  });

  describe("In Post multiple batteries", () => {
    describe("given invalid payload", () => {
      it("should reject with some error message", async () => {
        const prismaCreateManyRes: Prisma.BatchPayload = {
          count: 0,
        };
        mockCtx.prisma.battery.createMany.mockResolvedValue(
          prismaCreateManyRes
        );
        await expect(
          batteryServices.postMultipleBatteries([], ctx)
        ).rejects.toThrow(ERROR_BATTERY_REASON.COULD_NOT_POST);

        // checking for status codes
        batteryServices.postMultipleBatteries([], ctx).catch((error) => {
          expect(error).toBeInstanceOf(HttpError);
          if (error instanceof HttpError) {
            expect(error.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
          }
        });
      });
    });
  });
});

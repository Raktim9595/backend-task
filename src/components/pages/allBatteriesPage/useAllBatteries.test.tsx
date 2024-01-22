import { renderHook, waitFor } from "@testing-library/react";
import { useAllBatteries } from "./useAllBatteries";
import { mockedBatteryRes } from "@/mocks/mockData";
import * as batteryAPi from "../../../services/batteries";
import { createTestWrapper } from "@/utils/testWrapper";

jest.mock("../../../services/batteries");

describe("use all batteries hook", () => {
	describe("get all batteries api", () => {
		describe("upon providing proper payload", () => {
			it("should return list of batteries with proper pagination", async () => {
				(batteryAPi.getAllBatteries as jest.Mock).mockResolvedValue(mockedBatteryRes);
				const { result } = renderHook(useAllBatteries, {
					wrapper: createTestWrapper(),
				});
				await waitFor(() => result.current.allBatteries);
				await waitFor(() => result.current.pagination);

				expect(result.current.allBatteries).toHaveLength(mockedBatteryRes.content?.length!);
				expect(result.current.pagination.page).toStrictEqual(10);
			});
		});

		describe("upon providing improper response", () => {
			it("should reject with error", async () => {
				(batteryAPi.getAllBatteries as jest.Mock).mockResolvedValue(null);
				const { result } = renderHook(useAllBatteries, {
					wrapper: createTestWrapper(),
				});
				await waitFor(() => result.current.allBatteries);
				expect(result.current.allBatteries).toBeUndefined();
			});
		});
	});
});

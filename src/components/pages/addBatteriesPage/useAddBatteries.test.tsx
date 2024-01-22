import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { useSnackbarContext } from "../../../context/snackbar/useSnackbarContext";
import { snackBarInitState } from "@/context/snackbar/snackbarContext.types";
import { createTestWrapper } from "@/utils/testWrapper";
import AddBatteriesPage from ".";
import * as BatteryApi from "@/services/batteries";
import { mockBatterPostSuccessRes, mockFailedPostBatteryResponse } from "@/mocks/mockData";
import { useAddBatteriesHooks } from "./useAddBatteries";
import userEvent from "@testing-library/user-event";
import {
	addBatteryLoadingSnackbarState,
	postBatterySuccessSnackbarState,
} from "./addBatteries.types";
import { useRouter } from "next/navigation";
import { PATH } from "@/helpers/paths";

jest.mock("../../../services/batteries");
jest.mock("../../../context/snackbar/useSnackbarContext");
jest.mock("next/navigation");

let mockOpenSnackbar: jest.Mock;
let push: jest.Mock;

beforeEach(() => {
	// mocking snackbar functions
	mockOpenSnackbar = jest.fn();
	(useSnackbarContext as jest.Mock).mockReturnValue({
		snackbarState: snackBarInitState,
		closeSnackBar: jest.fn(),
		openSnackbar: mockOpenSnackbar,
	});

	// mocking next/navigation
	push = jest.fn();
	(useRouter as jest.Mock).mockImplementation(() => ({
		push: push,
	}));
});
afterEach(() => {
	jest.clearAllMocks();
});

describe("useAddBatteries hooks", () => {
	describe("adding batteries to database using file", () => {
		describe("given proper csv file", () => {
			it("should post battery to database and set snackbar message", async () => {
				const user = userEvent.setup();

				render(<AddBatteriesPage />, {
					wrapper: createTestWrapper(),
				});

				const saveButton = screen.getByRole("button", {
					name: "Save",
				});

				expect(saveButton).toBeInTheDocument;
				(BatteryApi.postBatteryCsv as jest.Mock).mockResolvedValue(mockBatterPostSuccessRes);
				const { result } = renderHook(useAddBatteriesHooks, {
					wrapper: createTestWrapper(),
				});

				await waitFor(() => result.current.postBatteriesToDatabase);
				await user.click(saveButton);

				expect(mockOpenSnackbar).toHaveBeenNthCalledWith(1, addBatteryLoadingSnackbarState);
				expect(mockOpenSnackbar).toHaveBeenNthCalledWith(2, postBatterySuccessSnackbarState);
				expect(push).toHaveBeenCalledTimes(1);
				expect(push).toHaveBeenCalledWith(PATH.BATTERIES.ROOT);
			});
		});

		describe("given improper csv file", () => {
			it("should open snackbar with variant error", async () => {
				const user = userEvent.setup();
				render(<AddBatteriesPage />, {
					wrapper: createTestWrapper(),
				});

				const saveButton = screen.getByRole("button", {
					name: "Save",
				});

				(BatteryApi.postBatteryCsv as jest.Mock).mockRejectedValue(mockFailedPostBatteryResponse);
				const { result } = renderHook(useAddBatteriesHooks, {
					wrapper: createTestWrapper(),
				});

				await waitFor(() => result.current.postBatteriesToDatabase);
				await user.click(saveButton);
				expect(mockOpenSnackbar).toHaveBeenCalledTimes(2);
				expect(mockOpenSnackbar).toHaveBeenNthCalledWith(1, addBatteryLoadingSnackbarState);

				const { message, status } = mockFailedPostBatteryResponse.response.data.error;
				expect(mockOpenSnackbar).toHaveBeenNthCalledWith(2, {
					autoTimeOut: false,
					variant: "error",
					message: `${message}, status: ${status}`,
				});
			});
		});
	});
});

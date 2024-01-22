import { renderHook } from "@testing-library/react";
import { useSnackbarContext } from "./useSnackbarContext";
import { SnackbarState, snackBarInitState } from "./snackbarContext.types";
import { act } from "react-dom/test-utils";

const openSnackBarPassedState: SnackbarState = {
	message: "open",
	open: true,
	autoTimeOut: false,
	variant: "error",
	autoTimeOutDuration: 2000,
};

describe("snackbar context", () => {
	describe("on inital render", () => {
		it("should have defined initial state", () => {
			const { result } = renderHook(useSnackbarContext);
			expect(result.current.snackbarState).toStrictEqual(snackBarInitState);
		});
	});

	describe("on calling open snackbar", () => {
		describe("given full props passed upon snackbar state", () => {
			it("should change snackbar state to passed state", () => {
				const { result } = renderHook(useSnackbarContext);
				act(() => result.current.openSnackbar(openSnackBarPassedState));
				expect(result.current.snackbarState).toStrictEqual(openSnackBarPassedState);
			});
		});

		describe("given only partial props passed for snackbar state", () => {
			it("should change snackbar states", () => {
				const partialPassedSnackbarState: SnackbarState = {
					message: "open",
					open: true,
				};
				const { result } = renderHook(useSnackbarContext);
				act(() => result.current.openSnackbar(partialPassedSnackbarState));
				expect(typeof result.current.snackbarState).toBe("object");
				expect(result.current.snackbarState.message).toStrictEqual(
					partialPassedSnackbarState.message,
				);
				expect(result.current.snackbarState.open).toStrictEqual(partialPassedSnackbarState.open);
			});
		});
	});

	describe("on calling close snackbar", () => {
		it("should change the state of snackbar.open to false from true", () => {
			const { result } = renderHook(useSnackbarContext);

			act(() =>
				result.current.openSnackbar({
					message: "open",
				}),
			);

			act(() => result.current.closeSnackBar());
			expect(result.current.snackbarState.open).toBe(false);
		});
	});
});

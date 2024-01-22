import React from "react";
import { SnackbarContextType, SnackbarState, snackBarInitState } from "./snackbarContext.types";

export const useSnackbarContext = (): SnackbarContextType => {
	const [snackbarState, setSnackbarState] = React.useState<SnackbarState>(snackBarInitState);

	const closeSnackBar = () => {
		setSnackbarState((initValues) => ({ ...initValues, open: false }));
	};

	const openSnackbar = ({
		message,
		variant = "success",
		autoTimeOut = false,
		autoTimeOutDuration = 6000,
	}: Omit<SnackbarState, "open">) => {
		setSnackbarState({
			open: true,
			variant,
			message,
			autoTimeOut,
			autoTimeOutDuration: autoTimeOutDuration,
		});
		if (autoTimeOut) {
			setTimeout(() => {
				closeSnackBar();
			}, autoTimeOutDuration);
		}
	};

	return {
		snackbarState,
		closeSnackBar,
		openSnackbar,
	};
};

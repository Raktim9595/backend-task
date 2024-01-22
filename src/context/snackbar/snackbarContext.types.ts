export type SnackbarState = {
	open: boolean;
	variant?: "error" | "success" | "info";
	message: string;
	autoTimeOut?: boolean;
	autoTimeOutDuration?: number;
};

export const snackBarInitState: SnackbarState = {
	open: false,
	variant: "success",
	message: "",
	autoTimeOut: false,
};

export type SnackbarContextType = {
	snackbarState: SnackbarState;
	openSnackbar: (state: Omit<SnackbarState, "open">) => void;
	closeSnackBar: () => void;
};

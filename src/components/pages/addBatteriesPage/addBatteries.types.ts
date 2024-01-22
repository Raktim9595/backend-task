import { SnackbarState } from "@/context/snackbar/snackbarContext.types";

export interface IBatteryForm {
	name: string;
	totalWatt: string;
	postCode: string;
}

export interface FormValues {
	batteries: Array<IBatteryForm>;
}

export interface IBatteryPageViewProps {
	loading: boolean;
	postBatteriesToDatabase: () => void;
	changeFileData: (file?: File) => void;
	file: File | undefined;
	isSuccess: boolean;
}

export const postBatterySuccessSnackbarState: Omit<SnackbarState, "open"> = {
	message: "batteries added successfully",
	autoTimeOut: false,
};

export const addBatteryLoadingSnackbarState: Omit<SnackbarState, "open"> = {
	message: "adding batteries",
	autoTimeOut: false,
	variant: "info",
};

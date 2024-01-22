import {
	IBatteryPageViewProps,
	addBatteryLoadingSnackbarState,
	postBatterySuccessSnackbarState,
} from "./addBatteries.types";
import { useMutation } from "@tanstack/react-query";
import BatteryController from "@/services/batteries";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { PATH } from "@/helpers/paths";
import { useContext, useState } from "react";
import { SnackbarContext } from "@/context/snackbar";
import { SnackbarContextType } from "@/context/snackbar/snackbarContext.types";
import { IError } from "@/interfaces/error";

export const useAddBatteriesHooks = (): IBatteryPageViewProps => {
	const router = useRouter();
	const { openSnackbar } = useContext(SnackbarContext) as SnackbarContextType;

	const { mutate: postCsvBattery, status } = useMutation<object, AxiosError<IError>, FormData>({
		mutationFn: (body) => BatteryController.postBatteryCsv(body),
		onSuccess: () => {
			openSnackbar(postBatterySuccessSnackbarState);
			router.push(PATH.BATTERIES.ROOT);
		},
		onError: (error) => {
			const { message, status } = error.response!.data.error;
			openSnackbar({
				message: `${message}, status: ${status}`,
				autoTimeOut: false,
				variant: "error",
			});
		},
	});

	const [file, setFile] = useState<File | undefined>();
	const changeFileData = (file?: File) => {
		setFile(file);
	};

	const postBatteriesToDatabase = () => {
		openSnackbar(addBatteryLoadingSnackbarState);
		const formData = new FormData();
		formData.append("file", file!);
		postCsvBattery(formData);
	};

	return {
		loading: status === "pending",
		isSuccess: status === "success",
		postBatteriesToDatabase,
		changeFileData,
		file,
	};
};

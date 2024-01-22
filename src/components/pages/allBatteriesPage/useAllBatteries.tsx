import BatteryServices from "@/services/batteries";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
	IBatteriesListPage,
	IRequestParamsType,
	initialBatteriesRequestParams,
} from "./allBatteriesPage.types";
import { IFilter } from "@/interfaces/filterAndSorts";
import { IBatteryRes } from "@/interfaces/battery";
import { AxiosError } from "axios";
import { IPagination, paginationInitalState } from "@/interfaces/pagination";

export const useAllBatteries = () => {
	const [batteryRequestParams, setBatteryRequestParams] = useState<IRequestParamsType>(
		initialBatteriesRequestParams,
	);

	const [paginationState, setPaginationState] = useState<IPagination>(paginationInitalState);

	const {
		data: allBatteries,
		mutate: getBatteries,
		isSuccess,
	} = useMutation<IBatteryRes, AxiosError, IRequestParamsType>({
		mutationFn: (body) => BatteryServices.getAllBatteries(body),
		onSuccess: (res) => {
			setPaginationState({
				page: res.pageNumber,
				pageSize: res.pageSize,
				totalElements: res.totalElements,
			});
		},
	});

	const handleChangePage = (newPage: number) => {
		setBatteryRequestParams((prev) => ({
			...prev,
			pageNumber: newPage,
		}));
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setBatteryRequestParams((prev) => ({
			...prev,
			pageNumber: 0,
			pageSize: parseInt(event.target.value, 10),
		}));
	};

	const changeFilters = (filter: IFilter) => {
		setBatteryRequestParams((prev) => ({
			...prev,
			filters: [...prev.filters!, filter],
			pageNumber: 0,
		}));
	};

	useEffect(() => {
		getBatteries(batteryRequestParams);
	}, [batteryRequestParams, getBatteries]);

	return {
		allBatteries: allBatteries?.content,
		handleChangePage,
		handleChangeRowsPerPage,
		pagination: paginationState,
		changeFilters,
		isSuccess,
	};
};

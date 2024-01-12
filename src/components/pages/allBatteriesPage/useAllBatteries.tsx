import BatteryServices from "@/services/batteries";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IBatteriesListPage, IRequestParamsType } from "./allBatteriesPage.types";
import { Filter, Operators } from "@/interfaces/filterAndSorts";
import { IBatteryRes } from "@/interfaces/battery";
import { AxiosError } from "axios";
import { IPagination } from "@/interfaces/pagination";

export const useAllBatteries = (): IBatteriesListPage => {
	const [batteryRequestParams, setBatteryRequestParams] = useState<IRequestParamsType<Operators>>({
		filter: {},
		pageNumber: 0,
		pageSize: 10,
	});

	const [paginationState, setPaginationState] = useState<IPagination>({
		page: 0,
		pageSize: 10,
		totalElements: 0,
	});

	const { data: allBatteries, mutate: getAllBatteries } = useMutation<
		IBatteryRes,
		AxiosError,
		IRequestParamsType<Operators>
	>({
		mutationFn: (body) => BatteryServices.getAllBatteries(body),
		onSuccess: (res) => {
			setPaginationState({
				page: res.data.pageNumber,
				pageSize: res.data.pageSize,
				totalElements: res.data.totalElements,
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

	const changeFilters = (filter: Filter<Operators>) => {
		setBatteryRequestParams((prev) => ({
			...prev,
			filter,
		}));
	};

	useEffect(() => {
		getAllBatteries(batteryRequestParams);
	}, [batteryRequestParams, getAllBatteries]);

	return {
		allBatteries: allBatteries?.data.content,
		handleChangePage,
		handleChangeRowsPerPage,
		pagination: paginationState,
		changeFilters,
	};
};

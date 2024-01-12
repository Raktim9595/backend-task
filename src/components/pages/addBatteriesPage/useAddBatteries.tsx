import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { FormValues, IBatteryPageViewProps } from "./addBatteries.types";
import { IBattery } from "@/interfaces/battery";
import { useMutation } from "@tanstack/react-query";
import BatteryController from "@/services/batteries";
import { AxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { batteryArrayValidationSchema } from "@/validationSchemas/postBatteriesValidation";

export const useAddBatteriesHooks = (): IBatteryPageViewProps => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: yupResolver(batteryArrayValidationSchema),
		defaultValues: {
			batteries: [
				{
					name: "",
					postCode: "",
					totalWatt: "",
				},
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "batteries",
	});

	const { mutate, status } = useMutation<
		object,
		AxiosError,
		Omit<IBattery, "id" | "averageWatt">[]
	>({
		mutationFn: (body) => BatteryController.postListOfBatteries(body),
	});

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		const body: Omit<IBattery, "id" | "averageWatt">[] = data.batteries.map((battery) => ({
			name: battery.name,
			postCode: Number(battery.postCode),
			totalWatt: Number(battery.totalWatt),
		}));
		mutate(body);
	};

	const postBatteriesToDatabase = () => {
		handleSubmit(onSubmit)();
	};

	return {
		control,
		loading: status === "pending",
		fields,
		append,
		postBatteriesToDatabase,
		errors,
		remove,
	};
};

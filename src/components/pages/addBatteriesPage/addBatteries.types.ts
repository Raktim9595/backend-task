import {
	Control,
	FieldArrayWithId,
	FieldErrors,
	UseFieldArrayAppend,
	UseFieldArrayRemove,
} from "react-hook-form";

export interface IBatteryForm {
	name: string;
	totalWatt: string;
	postCode: string;
}

export interface FormValues {
	batteries: Array<IBatteryForm>;
}

export interface IBatteryPageViewProps {
	control: Control<FormValues>;
	loading: boolean;
	postBatteriesToDatabase: () => void;
	append: UseFieldArrayAppend<FormValues, "batteries">;
	fields: FieldArrayWithId<FormValues, "batteries", "id">[];
	errors: FieldErrors<FormValues>;
	remove: UseFieldArrayRemove;
}

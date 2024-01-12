export type Operators = "BETWEEN" | "EQUAL" | "NOT_EQUAL" | "IN";

export interface FilterValueBetween {
	value_from: string;
	value_to: string;
}

// Mapping of operators to their respective value types
type OperatorValueTypes = {
	EQUAL: string;
	NOT_EQUAL: string;
	IN: string[];
	BETWEEN: FilterValueBetween;
};

export interface Filter<T extends Operators> {
	key: string;
	operator: T;
	value: OperatorValueTypes[T];
}

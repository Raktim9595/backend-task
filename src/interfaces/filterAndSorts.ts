export type Operators = "BETWEEN" | "EQUAL" | "NOT_EQUAL" | "CONTAINS";

export enum OPERATORS_ENUM {
	BETWEEN = "BETWEEN",
	EQUAL = "EQUAL",
	NOT_EQUAL = "NOT_EQUAL",
	IN = "IN",
	CONTAINS = "CONTAINS",
}

export interface FilterValueBetween {
	value_from: number;
	value_to: number;
}

interface IFilterBase {
	key: string;
}

export interface IFilterBetween extends IFilterBase {
	operator: OPERATORS_ENUM.BETWEEN;
	value: FilterValueBetween;
}

export interface IFilterContains extends IFilterBase {
	operator: OPERATORS_ENUM.CONTAINS;
	value: string;
}

export interface IFilterEqual extends IFilterBase {
	operator: OPERATORS_ENUM.EQUAL;
	value: string;
}

export type IFilter = IFilterBetween | IFilterContains | IFilterEqual;

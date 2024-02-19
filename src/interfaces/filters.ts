export type Operators = "BETWEEN" | "EQUAL" | "IN" | "CONTAINS";

export enum OPERATORS_ENUM {
  BETWEEN = "BETWEEN",
  EQUAL = "EQUAL",
  NOT_EQUAL = "NOT_EQUAL",
  IN = "IN",
  CONTAINS = "CONTAINS",
}

export type ValueBetween = {
  value_from: number;
  value_to: number;
};

type OperatorValueTypes = {
  EQUAL: string | number;
  IN: string[];
  BETWEEN: ValueBetween;
  CONTAINS: string | number;
};

export type IFilter<T extends Operators> = {
  key: string;
  operator: T;
  value: OperatorValueTypes[T];
};

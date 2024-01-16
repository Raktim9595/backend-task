export type Operators = "BETWEEN" | "EQUAL" | "NOT_EQUAL" | "IN";

export type ValueBetween = {
  value_from: string;
  value_to: string;
};

type OperatorValueTypes = {
  EQUAL: string;
  NOT_EQUAL: string;
  IN: string[];
  BETWEEN: ValueBetween;
};

export type IFilter<T extends Operators> = {
  key: string;
  operator: T;
  value: OperatorValueTypes[T];
};

type Operators = "BETWEEN" | "EQUAL" | "NOT_EQUAL" | "IN";

export type ValueBetween = {
  value_from: string;
  value_to: string;
};

export type Filter = {
  key: string;
  operator: Operators;
  value: ValueBetween;
};

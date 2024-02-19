import { IFilter, OPERATORS_ENUM, Operators } from "../interfaces/filters";

export const generateFilters = (filter: IFilter<Operators>) => {
  let filterObject = {};

  switch (filter.operator) {
    case OPERATORS_ENUM.BETWEEN: {
      const betweenFilter = filter as IFilter<OPERATORS_ENUM.BETWEEN>;
      filterObject = {
        [betweenFilter.key]: {
          gte: betweenFilter.value.value_from,
          lte: betweenFilter.value.value_to,
        },
      };
      break;
    }
    case OPERATORS_ENUM.EQUAL: {
      const equalFilter = filter as IFilter<OPERATORS_ENUM.EQUAL>;
      filterObject = {
        [equalFilter.key]: {
          equals: equalFilter.value,
        },
      };
      break;
    }
    case OPERATORS_ENUM.CONTAINS: {
      const containsFilter = filter as IFilter<OPERATORS_ENUM.CONTAINS>;
      filterObject = {
        [containsFilter.key]: {
          contains: containsFilter.value,
          mode: "insensitive",
        },
      };
      break;
    }
    default:
      break;
  }

  return filterObject;
};

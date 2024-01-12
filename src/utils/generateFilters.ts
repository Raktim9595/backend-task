import { Filter } from "../interfaces/filters";

export const generateFilters = (filter: Filter) => {
  let filterObject = {};
  if (filter.key) {
    filterObject = {
      [filter.key]: {
        gte: parseInt(filter.value.value_from),
        lte: parseInt(filter.value.value_to),
      },
    };
  }
  return filterObject;
};

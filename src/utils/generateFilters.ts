import { Filter } from "../interfaces/filters";

export const generateFilters = (filter: Filter) => {
  let filterObject = {};
  if (filter.key) {
    filterObject = {
      [filter.key]: {
        gte: filter.value.value_from ?? "",
        lte: filter.value.value_to ?? "",
      },
    };
  }
  return filterObject;
};

import { Pagination } from "../interfaces/pagination";
import _ from "lodash";

export function getPaginationParameters(props: Pagination) {
  const page = props.pageNumber ?? 1;
  const limit = props.pageSize ?? 10;
  const offset = _.multiply(page, limit);
  return { skip: offset, take: limit };
}

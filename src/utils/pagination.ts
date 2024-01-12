import { Pagination } from "../interfaces/pagination";

export function getPaginationParameters(props: Pagination) {
  console.log(props);
  const page = props.pageNumber ?? 1;
  const limit = props.pageSize ?? 10;
  const offset = page * limit;
  return { skip: offset, take: limit };
}

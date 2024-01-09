import { Pagination } from "../interfaces/pagination";

export function getPaginationParameters(props: Pagination) {
  console.log(props);
  const page = parseInt(props.pageNumber) ?? 1;
  const limit = parseInt(props.pageSize) ?? 10;
  const offset = (page - 1) * limit;
  return { skip: offset, take: limit };
}

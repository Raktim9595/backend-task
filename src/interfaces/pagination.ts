export type Pagination = {
  pageNumber: number;
  pageSize: number;
};

export type IGetAllServicesProps = Pagination & {
  filters: Array<object>;
};

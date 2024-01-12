export type Pagination = {
  pageNumber: number;
  pageSize: number;
};

export type IGetAllServicesProps = Pagination & {
  filter: object;
};

export type Pagination = {
  pageNumber: string;
  pageSize: string;
};

export type IGetAllServicesProps = Pagination & {
  filter: object;
};

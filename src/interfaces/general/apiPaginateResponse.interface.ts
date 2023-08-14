export interface ApiPaginateResponse<T> {
  data: T;
  pageCount: number;
  total: number;
  limit: number;
  skip: number;
}

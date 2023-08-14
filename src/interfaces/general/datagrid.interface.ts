/* eslint-disable no-unused-vars */
import { ApiPaginateResponse, PaginationParams } from '@/interfaces';

export interface DataGridDataSource<T> {
  data: ApiPaginateResponse<T>;
  columns: any;
  paginationParams: PaginationParams;
  fetchData: () => void;
  setPaginationParams: (data: PaginationParams) => void;
  OnRowClicked?: (row: any) => void;
  isLoading?: boolean;
  isError?: boolean;
  noDataText?: string;
}

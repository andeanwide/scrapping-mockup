import { ApiPaginateResponse, PaginationParams } from '@/interfaces';
import { OnChangeFn, PaginationState } from '@tanstack/react-table';

export interface dataGridDataSource<T> {
  data: ApiPaginateResponse<T>;
  columns: any;
  pagination: PaginationParams;
  fetchData: () => void;
  setPaginationChange: OnChangeFn<PaginationState>;
  // eslint-disable-next-line no-unused-vars
  OnRowClicked?: (row: any) => void;
  isLoading?: boolean;
  isError?: boolean;
  noDataText?: string;
}

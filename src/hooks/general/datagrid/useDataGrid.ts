import React, { useState } from 'react';
import { PaginationState } from '@tanstack/react-table';

export const useDataGrid = ({ initialFilters }: any) => {
  const [filters, setFilters] = useState(initialFilters);
  // const [paginationParams, setPaginationParams] = useState<PaginationParams>({
  //   pageIndex: 0,
  //   pageSize: 10,
  // });

  const [paginationParams, setPaginationParams] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const addFilter = (data: object) => {
    setFilters({ ...filters, ...data });
  };

  // const changePage = (data: object) => {
  //   setPaginationParams({ ...paginationParams, ...data });
  // };

  return {
    filters,
    paginationParams,
    setPaginationParams,
    //metodos
    addFilter,
    // changePage,
  };
};

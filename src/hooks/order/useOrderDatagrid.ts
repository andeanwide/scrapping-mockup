import React, { useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import { axiosPrivate } from '@/lib';
import { ApiPaginateResponse, order, orderFilters } from '@/interfaces';
import { getFilters } from '@/helpers';
import { useDataGrid } from '@/hooks/general';

export const useOrderDataGrid = () => {
  const initialFilters = { globalSearch: '' };
  const { filters, paginationParams, setPaginationParams, addFilter } = useDataGrid({
    initialFilters,
  });

  const fetchData = useCallback(async (): Promise<ApiPaginateResponse<order[]>> => {
    try {
      const filtersRoutes = getFilters<orderFilters>(filters);
      const route = '/orders';
      const params = `?skip=${paginationParams.pageIndex * 10}&limit=${paginationParams.pageSize}`;

      const { data } = await axiosPrivate.get<ApiPaginateResponse<order[]>>(
        `${route}${params && params}${filtersRoutes}`,
      );

      return {
        data: data.data,
        pageCount: Math.ceil(data.total / paginationParams.pageSize),
        limit: data.limit,
        skip: data.skip,
        total: data.total,
      };
    } catch (e) {
      return {
        data: [],
        pageCount: 0,
        limit: 10,
        skip: 1,
        total: 0,
      };
    }
  }, [filters, paginationParams.pageIndex, paginationParams.pageSize]);

  const { isLoading, error, isError, data, refetch } = useQuery(
    ['orders', paginationParams, filters],
    fetchData,
    { refetchOnWindowFocus: false },
  );

  const pagination = React.useMemo(() => paginationParams, [paginationParams]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetch();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [filters, refetch]);

  return {
    data,
    isLoading,
    error,
    isError,
    filters,
    paginationParams,
    pagination,
    //metodos
    refetch,
    addFilter,
    setPaginationParams,
  };
};

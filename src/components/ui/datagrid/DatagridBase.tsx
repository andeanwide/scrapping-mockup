import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { dataGridDataSource } from '@/interfaces/general/datagridDataSource.interface';
import Paginator from './Paginator';
import { ParagraphText } from '@/components/ui/labels/ParagraphText';
import { Spinner } from 'flowbite-react';

// const queryClient = new QueryClient();

export const DatagridBase = ({
  data,
  columns,
  pagination,
  setPaginationChange,
  isLoading,
  noDataText = 'Sin datos',
}: dataGridDataSource<any>) => {
  const {
    getHeaderGroups,
    getRowModel,
    // getPageCount,
    getCanNextPage,
    nextPage,
    setPageIndex,
    getState,
    // setPageSize,
    getCanPreviousPage,
    previousPage,
  } = useReactTable({
    data: data ? data?.data : [],
    columns,
    pageCount: data?.pageCount ?? 1,
    state: {
      pagination,
    },
    onPaginationChange: setPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  return (
    <div className='p-2'>
      <div className='h-2' />
      <div className='relative shadow overflow-hidden overflow-x-auto border-b border-gray-200 dark:border-slate-600 dark:bg-dark-primary sm:rounded-lg min-h-[calc(50vh)] transition-colors duration-300'>
        {isLoading && (
          <div>
            <div className='absolute h-full w-full flex items-center justify-center bottom-30 '>
              <Spinner size='xl' />
            </div>
          </div>
        )}
        <table className='table min-w-full divide-y divide-gray-200 dark:divide-slate-600 transition-colors duration-300'>
          <thead className='bg-gray-50 dark:bg-dark-primary'>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className='group px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-white uppercase tracking-wider'
                    >
                      {header.isPlaceholder ? null : (
                        <div className='flex items-center justify-between'>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          {data?.pageCount > 0 && (
            <tbody className='bg-white dark:bg-dark-primary divide-y divide-gray-200 dark:divide-slate-600'>
              {getRowModel().rows.map((row) => {
                return (
                  <tr
                    key={row.id}
                    className='even:bg-slate-50 dark:even:bg-dark-primary-shade odd:bg-transparent dark:odd:bg-transparent'
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id} className='px-6 py-2' role='cell'>
                          <div className='text-sm text-gray-700 dark:text-white'>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {!isLoading && data?.pageCount <= 0 && (
          <div className='w-full flex justify-center h-full mt-12 items-center'>
            <ParagraphText text={noDataText} extraClass='font-bold text-lg text-light-text' />
          </div>
        )}
      </div>
      <div className='h-2' />

      <Paginator
        currentPage={getState().pagination.pageIndex}
        canPreviousPage={getCanPreviousPage}
        canNextPage={getCanNextPage}
        prevPage={previousPage}
        nextPage={nextPage}
        totalPages={data?.pageCount}
        gotoPage={setPageIndex}
      />
    </div>
  );
};

import { H4 } from '../labels/H4';
import { IconButton } from '../button/IconButton';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import { DOTS, usePaginator } from '@/hooks';
import { ParagraphText } from '../labels/ParagraphText';

export default function Paginator({
  // pageSize,
  currentPage,
  canPreviousPage,
  canNextPage,
  prevPage,
  nextPage,
  totalPages,
  // onClickPageNumber,
  gotoPage,
  hasPageNumbers = true,
}: any) {
  const paginationRange = usePaginator({
    currentPage: currentPage + 1,
    totalPages,
    siblingCount: 1,
    // pageSize,
  });
  return (
    <div className='flex justify-between items-center flex-wrap'>
      <div className='flex mb-4 md:mb-0'>
        {totalPages > 0 && (
          <H4 label={`Pagina ${currentPage + 1} de ${totalPages}`} extraClass='dark:text-white' />
        )}
      </div>
      {totalPages >= 1 && (
        <div className='flex border-y dark:border-slate-600 rounded-2xl min-h-[2.25rem] bg-white dark:bg-inherit'>
          <IconButton
            extraClass='border dark:border-slate-600 !rounded-l-2xl !rounded-r-none'
            onClick={() => prevPage()}
            disabled={!canPreviousPage()}
          >
            <ArrowLeftCircleIcon className='text-primary-text h-5 w-5' />
          </IconButton>
          {hasPageNumbers && (
            <div className='flex align-center overflow-auto'>
              {paginationRange?.map((pageNumber, idx) => {
                // If the pageItem is a DOT, render the DOTS unicode character
                // console.log(pageNumber);
                if (pageNumber === DOTS) {
                  return (
                    <div key={idx} className='flex items-center'>
                      &#8230;
                    </div>
                  );
                }

                // Render our Page Pills
                return (
                  <button
                    key={idx}
                    className={`px-3 dark:border-r-2 dark:border-slate-600 dark:hover:bg-dark-hover-btn ${
                      +pageNumber == currentPage + 1 ? 'bg-slate-100 dark:bg-slate-500' : ''
                    }`}
                    onClick={() => {
                      gotoPage(+pageNumber - 1);
                    }}
                  >
                    <ParagraphText text={pageNumber.toString()} extraClass='dark:text-white' />
                  </button>
                );
              })}
            </div>
          )}
          <IconButton
            extraClass='border dark:border-slate-600 !rounded-l-none !rounded-r-2xl'
            onClick={() => nextPage()}
            disabled={!canNextPage()}
          >
            <ArrowRightCircleIcon className='text-primary-text h-5 w-5' />
          </IconButton>
        </div>
      )}
    </div>
  );
}

import { useEffect, useMemo } from 'react';
import { ApiPaginateResponse, modalProps, orderFormProps, order } from '@/interfaces';
import { DatagridBase } from '../../ui/datagrid/DatagridBase';
import { useAppSelector, useModal, useOrderDataGrid } from '@/hooks';
import { createColumnHelper } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import {
  CreateEditOrder,
  FilterOrder,
  IconButton,
  NotificationOrderForm,
  TextButton,
  UpdateOrderStatusForm,
} from '@/components';
import { CheckIcon, BellAlertIcon } from '@heroicons/react/24/solid';
import { STATUS_ORDER } from '@/theme';
import { Tooltip } from 'flowbite-react';

const getTranslateStatus = (value: string) => {
  if (value === 'FAIL') return 'FALLO';
  else if (value === 'PENDING') return 'PENDIENTE';
  else return 'APROVADO';
};

export const DatagridOrder = () => {
  const { isLoading, isError, data, refetch, pagination, setPaginationParams, addFilter, filters } =
    useOrderDataGrid();
  const columnHelper = createColumnHelper<orderFormProps>();
  const { reloadModule } = useAppSelector((state) => state.web);
  const { handleOpen, handleClose } = useModal();

  const handleOpenModalOrder = (
    data: orderFormProps | undefined,
    component: any,
    modalProps: modalProps,
  ) => {
    const Content: React.FunctionComponent<any> = component;
    handleOpen({
      component: <Content isEdit={data ? true : false} data={data} />,
      modalProps,
    });
  };

  const defaultColumns = [
    columnHelper.accessor('client', {
      cell: (info) => info.getValue(),
      header: () => <span className='font-bold'>Cliente</span>,
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor('symbol', {
      cell: (info) => info.getValue(),
      header: () => <span className='font-bold'>Par</span>,
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor('amount', {
      cell: (info) => info.getValue(),
      header: () => <span className='font-bold'>Monto</span>,
    }),
    columnHelper.accessor('rate', {
      cell: ({ row }) => row.original?.rate?.bid,
      header: () => <span className='font-bold'>Bid</span>,
    }),
    columnHelper.accessor('status', {
      cell: (info) => {
        const background = new Map();

        if (info.getValue() === 'SUCCESS') background.set('bg', 'bg-green-600');
        else if (info.getValue() === 'PENDING') background.set('bg', 'bg-yellow-300');
        else background.set('bg', 'bg-red-600');
        return (
          <span className={`${background.get('bg')} text-white py-1 px-2 font-bold rounded-full`}>
            {getTranslateStatus(info.getValue())}
          </span>
        );
      },
      footer: (props) => props.column.id,
      header: () => <span className='font-bold'>Estado</span>,
    }),
    columnHelper.accessor('type', {
      cell: (info) => (
        <span
          className={`${
            info.getValue() === 'buy' ? 'bg-green-600' : 'bg-red-600'
          } text-white font-bold py-1 px-2 rounded-full`}
        >
          {info.getValue() === 'buy' ? 'COMPRA' : 'VENTA'}
        </span>
      ),
      footer: (props) => props.column.id,
      header: () => <span className='font-bold'>Tipo</span>,
    }),
    columnHelper.accessor('createdAt', {
      cell: (info) => format(parseISO(info.getValue()), 'yyyy/MM/dd - HH:mm:ss'),
      footer: (props) => props.column.id,
      header: () => <span className='font-bold'>Fecha</span>,
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <span className='font-bold'>Acciones</span>,
      cell: ({ row }) => (
        <div className='flex gap-x-1'>
          <>
            {row.original.status === STATUS_ORDER.pending && (
              <Tooltip content='Estado de la orden'>
                <IconButton
                  onClick={() =>
                    handleOpenModalOrder(row.original, UpdateOrderStatusForm, {
                      title: 'Asignar estado de la orden',
                    })
                  }
                  extraClass='w-9'
                >
                  <CheckIcon className='h-4 w-4 p-0' />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip content='Notificación'>
              <IconButton
                onClick={() =>
                  handleOpenModalOrder(row.original, NotificationOrderForm, {
                    title: 'Notificación de la orden',
                  })
                }
                extraClass='w-9 rounded-full'
              >
                <BellAlertIcon className='h-4 w-4 p-0 m-auto' />
              </IconButton>
            </Tooltip>
          </>
        </div>
      ),
    }),
  ];

  const dataSource: ApiPaginateResponse<order[]> = useMemo(() => {
    const prepareData = data
      ? data
      : {
          pageCount: 0,
          data: [],
          total: 0,
          limit: 10,
          skip: 0,
        };
    return prepareData;
  }, [data]);

  const fetchData = useMemo(() => refetch, [refetch]);

  useEffect(() => {
    refetch();
    handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadModule, refetch]);

  return (
    <>
      <div className='px-4 h-4/5 relative'>
        <div className='flex justify-end items-center gap-x-4'>
          <FilterOrder addFilter={addFilter} initialFilters={filters} />
          <TextButton
            onClick={() =>
              handleOpenModalOrder(undefined, CreateEditOrder, { title: 'Crear Orden' })
            }
            type='button'
          >
            Crear Orden
          </TextButton>
        </div>
        <DatagridBase
          data={dataSource}
          columns={defaultColumns}
          fetchData={fetchData}
          pagination={pagination}
          setPaginationChange={setPaginationParams}
          // enableFiltering={false}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </>
  );
};

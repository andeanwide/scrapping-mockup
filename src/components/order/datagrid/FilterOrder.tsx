import { useRef, useState } from 'react';
import { FunnelIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Label, Select, Tooltip } from 'flowbite-react';
import { useFormik } from 'formik';
import { orderFilters } from '@/interfaces';
import { useOutsideEvent } from '@/hooks';
import { IconButton, TextButton } from '@/components/ui';

export const FilterOrder = ({
  initialFilters,
  addFilter,
}: {
  initialFilters: orderFilters;
  // eslint-disable-next-line no-unused-vars
  addFilter: (filters: object) => void;
}) => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const wrapperRef = useRef(null);
  // const [filter, setFilter] = useState<object>({});

  useOutsideEvent(wrapperRef, openFilter, () => setOpenFilter(false));

  const initialValues: orderFilters = {
    status: initialFilters.status,
    type: '',
  };

  const handleSubmitFilter = (values: orderFilters) => {
    addFilter(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmitFilter,
  });

  const { handleSubmit, values, setFieldValue } = formik;

  return (
    <>
      <Tooltip content='Filtrado'>
        <IconButton onClick={() => setOpenFilter(true)} extraClass='w-10 h-10'>
          {openFilter ? <XMarkIcon className='w-5 h-5' /> : <FunnelIcon className='w-5 h-5' />}
        </IconButton>
      </Tooltip>

      {openFilter && (
        <div
          className='absolute right-0 top-10 z-30 bg-slate-50 dark:bg-dark-primary w-8/12 md:w-6/12 lg:w-4/12 h-2/12 p-4 rounded-lg shadow-lg transition-all border dark:border-dark-primary-shade'
          ref={wrapperRef}
        >
          <form onSubmit={handleSubmit}>
            <div className='mb-2'>
              <Label htmlFor='status' value='Estado' />
            </div>
            <Select
              id='status'
              name='status'
              onChange={(e) => setFieldValue('status', e.target.value)}
              value={values.status}
            >
              <option value=''>Todos</option>
              <option value='SUCCESS'>SUCCESS</option>
              <option value='PENDING'>PENDING</option>
              <option value='FAIL'>FAIL</option>
            </Select>
            <br />
            <div className='mb-2'>
              <Label htmlFor='type' value='Tipo' />
            </div>
            <Select
              id='type'
              onChange={(e) => setFieldValue('type', e.target.value)}
              value={values.type}
            >
              <option value=''>Todos</option>
              <option value='buy'>buy</option>
              <option value='sell'>sell</option>
            </Select>
            <br />
            <TextButton type='submit'>
              <>
                <MagnifyingGlassIcon className='mr-2 h-5 w-5' />
                Buscar
              </>
            </TextButton>
          </form>
        </div>
      )}
    </>
  );
};

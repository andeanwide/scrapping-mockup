import { orderFormProps } from '@/interfaces';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ORDER_OPTION_STATUS } from '@/theme';
import { useFormik } from 'formik';
import { updateStatusOrderSchema } from '@/schemas';
import { statusOrder } from '@/types';
import { RadioGroupComponent, TextButton } from '@/components/ui';
import { useOrderStore } from '@/hooks';

interface updateOrderStatusProps {
  data: orderFormProps;
}

export const UpdateOrderStatusForm = ({ data }: updateOrderStatusProps) => {
  const { updateStatusOrder } = useOrderStore();
  const orderStatusOptions = ORDER_OPTION_STATUS;

  const handleUpdateOrder = (values: any) => {
    updateStatusOrder(data._id, values.orderStatus);
  };

  const formik = useFormik({
    initialValues: { orderStatus: '' },
    validationSchema: updateStatusOrderSchema,
    onSubmit: handleUpdateOrder,
  });

  const { handleSubmit, setFieldValue, errors, isSubmitting, isValid, dirty } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <div className='text-center'>
        <br />
        <ExclamationTriangleIcon className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
        <h3 className='text-lg font-normal text-gray-500 dark:text-gray-400'>
          Vamos a actualizar la orden
        </h3>
        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400 font-bold'>
          {`${data?.type} - ${data?.amount}`}
        </h3>
        <div className='flex justify-center gap-4'>
          <RadioGroupComponent
            options={orderStatusOptions}
            name='orderStatus'
            onChange={(status: statusOrder) => setFieldValue('orderStatus', status.id)}
            errors={errors.orderStatus}
            text='Acciones'
          />
        </div>
      </div>
      <div className='w-full flex justify-end'>
        <TextButton
          type='submit'
          isProcessing={isSubmitting}
          disabled={isSubmitting || !(isValid && dirty)}
        >
          Actualizar
        </TextButton>
      </div>
    </form>
  );
};

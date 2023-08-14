import { TextButton } from '@/components/ui';
import { useModal, useOrderStore } from '@/hooks';
import { orderFormProps } from '@/interfaces';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { Button } from 'flowbite-react';
import { useState } from 'react';

interface NotificationOrderProps {
  data: orderFormProps;
}

export const NotificationOrderForm = ({ data }: NotificationOrderProps) => {
  const { sendNotificationOrder } = useOrderStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleClose } = useModal();

  const handleSendNotification = () => {
    setIsLoading(true);
    sendNotificationOrder(data?._id, setIsLoading);
  };

  const keys = Object.keys(data);
  const values = Object.values(data);

  return (
    <form>
      <div className='text-center'>
        <br />
        <QuestionMarkCircleIcon className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
        <h3 className='text-lg font-normal text-gray-500 dark:text-gray-400'>Notificar la orden</h3>
        <br />
        {values.map((orderValue, index) =>
          orderValue && keys[index] !== 'rate' && !keys[index].includes('_') ? (
            <div key={index} className='w-full flex gap-x-4'>
              <h3 className='text-md text-gray-500 dark:text-gray-400 font-bold w-4/12 text-right'>
                {keys[index]}
              </h3>
              <h3 className='text-md text-gray-500 dark:text-gray-400 font-bold w-8/12 break-all truncate text-left'>
                {orderValue}
              </h3>
            </div>
          ) : null,
        )}

        <br />
        <div className='flex justify-center gap-4'>
          <TextButton
            disabled={isLoading}
            isProcessing={isLoading}
            onClick={handleSendNotification}
            type='button'
          >
            Si, Confirmar
          </TextButton>
          <Button disabled={isLoading} color='gray' onClick={() => handleClose()}>
            No, Cancelar
          </Button>
        </div>
      </div>
    </form>
  );
};

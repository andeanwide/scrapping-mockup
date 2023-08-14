import { CheckCircleIcon } from '@heroicons/react/24/outline';

export const Success = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <CheckCircleIcon className='h-40 w-40 dark:text-white' />
      <br />
      <h3 className='text-2xl dark:text-white mb-8'>Transacción exitosa</h3>
      <br />
      <span className='text-xl dark:text-white'>Referencia: 000000003257712</span>
      <span className='text-xl dark:text-white'>monto: 151515</span>
      <span className='text-xl dark:text-white'>cuenta destino: 55555</span>
      <span className='text-xl dark:text-white'>fecha: 2023-10-10 14:14:14</span>
      <span className='text-xl dark:text-white'>documento: 123456789</span>
      <span className='text-xl dark:text-white'>concepto: regalias</span>
    </div>
  );
};

import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

export const OrderPage = () => {
  return (
    <section className='h-auto'>
      <br />
      <Card className='w-full m-auto min-h-[calc(100vh_-_8rem)] dark:bg-slate-800 dark:bg-opacity-30 dark:text-white'>
        <Link to='/user/transfer'>Transferir</Link>
      </Card>
      <br />
    </section>
  );
};

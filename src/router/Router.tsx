import { Loader, Login } from '@/components';
import { useAuthStore } from '@/hooks';
import { Auth, Home } from '@/layouts';
import { Route, Routes, Navigate } from 'react-router-dom';
import { OrderPage } from '@/page';
import { robot404 } from '@/assets/images';
import { TransferForm } from '@/components/transfer/form/TransferForm';
import { Success } from '@/page/order/Success';

export const Router = () => {
  const { status } = useAuthStore();

  return (
    <>
      {status === 'checking' ? (
        <Loader />
      ) : (
        <Routes>
          {status === 'unauthenticated' ? (
            <Route element={<Auth />}>
              <Route path='/auth/login' element={<Login />} />
              <Route path='/auth/*' element={<img src={robot404} className='w-12/12 m-auto' />} />
              <Route path='/*' element={<Navigate to='/auth/login' />} />
            </Route>
          ) : (
            <Route element={<Home />}>
              <Route path='/user/account' element={<OrderPage />} />
              <Route path='/user/transfer' element={<TransferForm />} />
              <Route path='/user/success' element={<Success />} />
              <Route path='/user/*' element={<img src={robot404} className='w-6/12 m-auto' />} />
              <Route path='/*' element={<Navigate to='/user/account' />} />
            </Route>
          )}
        </Routes>
      )}
    </>
  );
};

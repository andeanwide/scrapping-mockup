import { H3, Span, TextButton } from '@/components';
import { SidebarContext } from '@/context';
import { useAppSelector } from '@/hooks';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';

export const ProfilePage = () => {
  const { userDetails } = useAppSelector((state) => state.web);
  const { useWindowSize } = useContext(SidebarContext);
  const handleGenerateId = async () => {
    alert('generate id function');
  };

  const handleGenerateSecret = async () => {
    alert('generate secret function');
  };

  return (
    <section className='h-auto'>
      <br />
      {/* bg-gradient-to-r from-transparent via-transparent via-80% to-red-600 to-0% */}
      <div className='w-full flex flex-col lg:flex-row justify-center items-center lg:justify-between m-auto min-h-[calc(100vh_-_12rem)] gap-y-4 lg:gap-y-0'>
        <div className='flex justify-center items-center flex-col gap-y-12 lg:border-r dark:border-slate-500 w-6/12'>
          <H3
            extraClass='text-2xl block text-gray-500 text-center font-bold'
            label='Información general'
          />
          <UserCircleIcon className='max-w-28 max-h-28 dark:text-white' />
          <div className='break-all text-center'>
            <Span
              extraClass='text-lg text-gray-500 block'
              label={userDetails?.email || 'No data'}
            />
            <Span
              extraClass='text-lg text-gray-500 block'
              label={userDetails?.username || 'No data'}
            />
          </div>
          <div className='w-full'>
            <Span
              extraClass={`text-2xl block rounded-full text-gray-500 text-center font-bold`}
              label={userDetails?.isActive ? 'Activo' : 'Inactivo'}
            />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-y-4 w-6/12'>
          {useWindowSize() < 1023 && <hr className='w-full' />}
          <div className='w-full h-full lg:w-6/12 p-2 flex flex-col items-center justify-center'>
            {/* <div className='flex justify-center items-center flex-col gap-y-12 m-auto'> */}
            <H3
              extraClass='text-lg lg:text-2xl block rounded-full text-gray-500 text-center font-bold mb-12'
              label='Generar Identificador'
            />

            <TextButton type='button' onClick={handleGenerateId}>
              Generar
            </TextButton>
          </div>
          <hr className='w-full dark:border-slate-500' />
          <div className='w-full h-full lg:w-6/12 p-2 flex flex-col items-center justify-center'>
            {/* <div className='flex justify-center items-center flex-col gap-y-12 m-auto'> */}
            <H3
              extraClass='text-lg lg:text-2xl block rounded-full text-gray-500 text-center font-bold mb-12'
              label='Generar Secreto'
            />

            <TextButton type='button' onClick={handleGenerateSecret}>
              Generar
            </TextButton>
          </div>
        </div>
      </div>
    </section>
  );
};

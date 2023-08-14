import { getLocalStorageItem } from '@/helpers';
import { applyTheme, baseConfig } from '@/theme';
import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

export const Auth = () => {
  // const theme = getLocalStorageItem('theme');
  const config = getLocalStorageItem('config');
  const theme = getLocalStorageItem('theme');
  useEffect(() => {
    try {
      applyTheme(config ? JSON.parse(config).theme : baseConfig.theme, true);
    } catch (error) {
      applyTheme(baseConfig.theme, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
      <section className='bg-gray-50 dark:bg-dark-primary'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <Link
            to='/auth/login'
            className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
          >
            <img
              className='w-10 h-10 mr-2 rounded-full'
              src='https://www.andeanwide.com/awd.jpg'
              alt='logo'
            />
            ANDEANWIDE
          </Link>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
};

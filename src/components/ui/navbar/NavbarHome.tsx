import { useAuthStore } from '@/hooks';
import { Link } from 'react-router-dom';
import { Bars3Icon, Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import { SidebarContext } from '@/context';
import { useContext } from 'react';
import { UserDropdown } from '../dropdown/UserDropdown';

export const NavbarHome = () => {
  const { user } = useAuthStore();
  const { handleHideSideBar, handleShowSideBarMobile } = useContext(SidebarContext);
  return (
    <nav
      className={`sticky top-0 left-0 min-h-[5rem] w-full border-gray-200 bg-light-primary dark:bg-dark-primary transition-colors duration-300`}
    >
      <div className='max-w-screen flex flex-wrap items-center justify-between mx-auto p-4'>
        <div className='flex gap-x-6 lg:gap-x-24 transition-transform duration-300'>
          <Link to='/admin/home' className='flex items-center'>
            <img
              src='https://www.andeanwide.com/awd.jpg'
              className='h-8 mr-3 rounded-full'
              alt='andean Logo'
            />
            <span className='self-center text-lg font-semibold whitespace-nowrap dark:text-white'>
              ANDEANWIDE
            </span>
          </Link>
          <button
            className='hidden lg:block'
            onClick={() => handleHideSideBar((prevStatus: boolean) => !prevStatus)}
          >
            <Bars3BottomLeftIcon className='text-light-text-dark dark:text-white h-7 w-7' />
          </button>
          <button
            className='block lg:hidden'
            onClick={() => {
              handleShowSideBarMobile((prevStatus: any) => !prevStatus);
              handleHideSideBar(true);
            }}
          >
            <Bars3Icon className='text-light-text-dark dark:text-white h-7 w-7' />
          </button>
        </div>
        <UserDropdown user={user} />
      </div>
    </nav>
  );
};

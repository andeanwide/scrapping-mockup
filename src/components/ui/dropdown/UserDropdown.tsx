import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useAuthStore, useHandleProfile } from '@/hooks';
import { ParagraphText } from '../..';
import { ArrowLeftOnRectangleIcon, UsersIcon } from '@heroicons/react/24/outline';
import { Avatar } from 'flowbite-react';

export const UserDropdown = ({ user }: { user: any }) => {
  const { startLogout } = useAuthStore();
  const { goToProfile } = useHandleProfile();

  return (
    <Menu as='div' className='inline-block text-left ml-4'>
      <div>
        <Menu.Button className='inline-flex w-full items-center justify-center rounded-md font-medium text-grey dark:text-white'>
          <Avatar
            alt='User settings'
            img='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
            rounded
          />
          <div className='mx-4'>
            <ParagraphText text={user.username} extraClass='text-md text-left font-bold' />
            {/* <ParagraphText text={user.email} extraClass='text-md text-left' /> */}
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute flex z-50 mt-2 origin-top-left right-4 divide-y divide-gray-100 rounded-md bg-slate-200 dark:bg-slate-800 focus:outline-none dark:divide-gray-700 dark:bg-content-view'>
          <div className='py-1'>
            {/* <NavLink
              className={`flex items-center w-full px-4 py-2 text-left text-sm hover:bg-hover-btn text-light-text dark:text-white dark:hover:bg-gray-700`}
              to='/admin/profile'
            >
              <UsersIcon className='h-5 w-5 mr-4' />
              Perfil
            </NavLink> */}
            <Menu.Item>
              {() => (
                <button
                  className='flex items-center w-full px-4 py-2 text-left text-sm hover:bg-slate-300 text-light-text dark:text-white dark:hover:bg-gray-700'
                  onClick={() => goToProfile(user)}
                >
                  <UsersIcon className='h-5 w-5 mr-4' />
                  Perfil
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {() => (
                <button
                  className='flex items-center w-full px-4 py-2 text-left text-sm hover:bg-slate-300 text-light-text dark:text-white dark:hover:bg-gray-700'
                  onClick={startLogout}
                >
                  <ArrowLeftOnRectangleIcon className='h-5 w-5 mr-4' />
                  Cerrar Sesión
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

import { useContext } from 'react';
import { SidebarContext } from '@/context';
import { SidebarItem } from './SidebarItem';
import { SidebarRoutes } from './SidebarRoutes';
import { useAppSelector } from '@/hooks';

export const SidebarComplete = () => {
  const { hideSidebar } = useContext(SidebarContext);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <nav className='flex'>
      <div
        className={`icono h-screen px-4 py-8 ${
          hideSidebar ? 'w-72' : 'w-24'
        } transition-all duration-300 rounded-b-2xl bg-light-primary dark:bg-dark-primary`}
      >
        {SidebarRoutes.map((route, index) => (
          <div key={index}>
            {route.scope.some((rol) => rol === user?.isSuperUser) && (
              <SidebarItem
                hideSidebar={hideSidebar}
                Icon={route.icon}
                label={route.label}
                route={route.route}
              />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

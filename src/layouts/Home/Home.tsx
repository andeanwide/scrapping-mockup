import { NavbarHome, ModalManager, IconButton, SidebarThemeConfig } from '@/components';
import { Sidebar } from '@/components/ui/sidebar/sidebarTemplate/Sidebar';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { ModalProvider, Provider } from '@/context';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { onShowHideThemeSidebar } from '@/store/slices';
import { useEffect } from 'react';
import { applyTheme, baseConfig } from '@/theme';
import { getLocalStorageItem } from '@/helpers';

export const Home = () => {
  const { module } = useAppSelector((state) => state.web);
  const config = getLocalStorageItem('config');
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const runConfig = async () => {
  //     // const data = await useAxiosFreeRequest('/configurator');
  //     if (data) {
  //       setLocalStorageItem('config', data);
  //       setDataConfig(data);
  //     }
  //   };

  //   runConfig();
  // }, []);

  useEffect(() => {
    try {
      applyTheme(config ? JSON.parse(config).theme : baseConfig.theme, true);
    } catch (error) {
      applyTheme(baseConfig.theme, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Provider>
      <ModalProvider>
        <NavbarHome />
        <div className='h-[calc(100vh_-_5rem)] w-full flex flex-col sm:flex-row flex-grow overflow-hidden'>
          <div className=' flex-shrink flex-grow-0 z-50'>
            <div className='sticky top-0  w-full '>
              <ul className='flex sm:flex-col overflow-hidden content-center justify-between'>
                <Sidebar />
              </ul>
            </div>
          </div>
          <main
            role='main'
            className='w-full h-auto flex-grow pt-4 px-8 overflow-y-auto dark:bg-dark-primary-shade transition-colors duration-300'
          >
            <h2 className='text-2xl font-bold mb-4 dark:text-white'>{module.toUpperCase()}</h2>
            <Outlet />
          </main>
          <IconButton
            extraClass='fixed right-0 bottom-5 mr-1 bg-transparent dark:bg-transparent dark:hover:bg-transparent hover:bg-transparent focus:ring-transparent dark:focus:ring-transparent'
            onClick={() => dispatch(onShowHideThemeSidebar(true))}
          >
            <Cog6ToothIcon className='h-9 w-9 transition-all duration-500 hover:rotate-90 text-black dark:text-white' />
          </IconButton>
          <SidebarThemeConfig />
        </div>
        <ModalManager />
      </ModalProvider>
    </Provider>
  );
};

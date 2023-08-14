import { useContext } from 'react';
import { SidebarContext } from '@/context';
import { SidebarComplete } from './SidebarComplete';

export const Sidebar = () => {
  const { useWindowSize, showSidebarMobile, handleShowSideBarMobile } = useContext(SidebarContext);

  return (
    <>
      {useWindowSize() > 1023 ? (
        <SidebarComplete />
      ) : (
        <>
          <div
            className={`absolute z-40 cursor-default ${
              !showSidebarMobile ? '-translate-x-80' : ''
            } transition-all`}
          >
            <SidebarComplete />
          </div>
          {showSidebarMobile && (
            <div
              className='absolute h-screen w-screen bg-black bg-opacity-40 cursor-pointer'
              onClick={() => handleShowSideBarMobile((prev: any) => !prev)}
            ></div>
          )}
        </>
      )}
    </>
  );
};

import { useEffect } from 'react';

export const useOutsideEvent = (
  ref: React.RefObject<HTMLElement>,
  isOpenThemeMenu: boolean,
  updateStatus: () => void,
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (ref.current && !ref.current.contains(target) && isOpenThemeMenu) {
        updateStatus();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, isOpenThemeMenu, updateStatus]);
};

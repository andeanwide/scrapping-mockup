import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { H4 } from '@/components';
import { useAppDispatch } from '@/hooks';
import { setModuleName } from '@/store/slices';

interface SidebarItemProps {
  hideSidebar: boolean;
  Icon: any;
  label: string;
  route: string;
}
export const SidebarItem: React.FC<SidebarItemProps> = ({ hideSidebar, Icon, label, route }) => {
  const dispatch = useAppDispatch();
  return (
    <NavLink
      onClick={() => dispatch(setModuleName(label.toUpperCase()))}
      to={route}
      className={({ isActive }) =>
        `flex items-center mx-auto my-4 py-3 text-gray-700 dark:text-white hover:bg-slate-300 hover:text-black hover:fill-white dark:fill-white dark:hover:fill-yellow dark:hover:text-white dark:hover:bg-slate-600 rounded w-full ${
          isActive
            ? 'text-black fill-white bg-slate-300 dark:bg-slate-600 dark:fill-yellow dark:text-white'
            : ''
        }  ${!hideSidebar ? 'justify-center' : ' '} border-b-1 border-gray-100 `
      }
    >
      <div
        className={`text-center flex ${
          !hideSidebar ? 'flex-col' : 'flex-row'
        } transition-transform items-center justify-start`}
      >
        <div className={`${hideSidebar && 'mr-4'}  flex justify-center`}>
          <Icon className={`${hideSidebar && 'ml-7 '}  h-7 w-7`} />
        </div>
        {hideSidebar && (
          <H4
            extraClass={`inline-block transition-all w-4/6 flex justify-start font-bold `}
            label={label}
          />
        )}
      </div>
    </NavLink>
  );
};

SidebarItem.propTypes = {
  hideSidebar: PropTypes.bool.isRequired,
};

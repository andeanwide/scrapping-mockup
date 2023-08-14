import { useAppDispatch } from '@/hooks';
import { userProps } from '@/interfaces';
import { setUserDetails } from '@/store/slices';
import { useNavigate } from 'react-router-dom';

export const useHandleProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goToProfile = (values: userProps) => {
    dispatch(setUserDetails(values));
    navigate('/admin/users/profile');
  };

  return { goToProfile };
};

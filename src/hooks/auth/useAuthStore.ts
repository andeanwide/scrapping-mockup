import { axiosPrivate } from '@/lib';
import {
  checkToken,
  decodeString,
  getDataFromToken,
  getLocalStorageItem,
  removeLocalStorageItem,
  toastError,
} from '@/helpers';
import { loginFormProps } from '@/interfaces';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { login, reset, resetWeb, setLoading } from '@/store/slices';
import { user } from '@/types';

export const useAuthStore = () => {
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state) => state.auth);

  const startLogin = async (values: loginFormProps) => {
    try {
      if (values.username === 'admin' && values.password === 'secret') {
        dispatch(setLoading());
        dispatch(login({} as user));
      }
    } catch (error) {
      toastError('Ups, algo a salido mal, intentalo de nuevo.');
    }
  };

  const startLogout = async () => {
    try {
      const { data } = await axiosPrivate.post('/auth/logout');
      if (data) {
        removeLocalStorageItem('teh__');
        dispatch(reset());
        dispatch(resetWeb());
      }
    } catch (error) {
      toastError('Ups!, ha ocurrido un error');
    }
  };

  const checkAuthToken = () => {
    const tokenHash = getLocalStorageItem('teh__');
    if (tokenHash) {
      const { token } = decodeString(tokenHash);
      if (!token) {
        window.localStorage.removeItem('teh__');
        dispatch(resetWeb());
        return dispatch(reset());
      }

      const statusToken = checkToken(token);
      if (!statusToken) {
        removeLocalStorageItem('teh__');
        dispatch(resetWeb());
        return dispatch(reset());
      }
      if (status === 'unauthenticated' || status === 'checking') {
        //from refresh page
        dispatch(login(getDataFromToken(token)));
        return;
      }
    } else {
      if (status !== 'checking') {
        dispatch(resetWeb());
        dispatch(reset());
      }
    }
  };

  return { startLogin, startLogout, checkAuthToken, user, status };
};

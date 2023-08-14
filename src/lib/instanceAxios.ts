import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { configure } from 'axios-hooks';
import { getEnvironment } from '@/helpers';

const { VITE_API_BASE_URL } = getEnvironment();

const logoutProcess = () => {
  window.localStorage.removeItem('teh__');
  window.location.reload();
  return;
};

const axiosFree: AxiosInstance = axios.create({
  baseURL: VITE_API_BASE_URL,
  withCredentials: true,
  headers: { 'content-type': 'application/json' },
});

const axiosPrivate: AxiosInstance = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosPrivate.interceptors.response.use(
  async (config: AxiosResponse) => {
    return config;
  },
  async (error: any) => {
    const { config } = error;

    if (error.response?.status === 401 && error.config.url !== '/auth/refresh') {
      const { status } = await axiosPrivate.post('/auth/refresh');
      if (status >= 400) logoutProcess();
      else if (status === 201 || status === 200) {
        const request = await axiosPrivate(config);
        return request;
      }
      return Promise.reject(config);
    } else {
      if (error.code === 'ERR_CANCELED') {
        return Promise.resolve({ status: 499 });
      }
      if (error?.config?.url === '/auth/refresh' && error.response.status >= 400) logoutProcess();
      return Promise.reject(error);
    }
  },
);

configure({ axios: axiosPrivate });

export { axiosFree, axiosPrivate };

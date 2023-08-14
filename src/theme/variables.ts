import { moon, sun } from '@/assets/images';
import {
  darkBackgroundInterface,
  lightBackgroundInterface,
  primaryBackgroundInterface,
} from '@/interfaces';

export const ORDER_OPTION_STATUS = [
  { id: 'success', name: 'Aprobar' },
  { id: 'fail', name: 'Rechazar' },
];

export const MODE_APP = {
  development: 'DEVELOP',
  production: 'PRODUCTION',
};

export const STATUS_ORDER = {
  pending: 'PENDING',
  fail: 'FAIL',
  success: 'SUCCESS',
};

export const ROLES: { super: true | false; client: true | false } = { super: true, client: false };

export const primaryBackground: primaryBackgroundInterface = {
  'primary-blue': '#005eb8',
  'primary-orange': '#f96f38',
  'primary-green': '#1dbf95',
  'primary-black': '#000000',
  'primary-purple': '#4d0480',
};

export const darkBackground: darkBackgroundInterface = {
  'bg-dark-blue': '#0b2845',
  'bg-dark-purple': '#1e091e',
  'bg-dark-green': '#1e5f64',
  'bg-dark-gray': '#1a1725',
};

export const lightBackground: lightBackgroundInterface = {
  'bg-light-blue': '#1461af',
  'bg-light-purple': '#781cb4',
  'bg-light-green': '#26aeb9',
  'bg-light-gray': '#f1f5f9',
};

export const themeButtons = [
  { label: 'Claro', theme: 'light', image: sun },
  { label: 'Oscuro', theme: 'dark', image: moon },
];

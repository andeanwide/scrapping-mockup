import { getLocalStorageItem } from '@/helpers';
import { applyTheme } from '@/theme';

export const getLocalStorageConfigObject = () =>
  JSON.parse(getLocalStorageItem('config') || '{}').theme;

export const updateBackgroundTheme = (color: string, theme: string) => {
  const localConfig = getLocalStorageConfigObject();
  const typeBackground = theme === 'dark' ? '--dark-primary' : '--light-primary';
  localConfig[typeBackground] = color;
  applyTheme(localConfig, true);
};

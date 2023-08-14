import { getLocalStorageItem, setLocalStorageConfig } from '@/helpers';
import { shadeHexColor } from './shadeHexColor';
import { baseConfig } from './config';

// src/themes/utils.js
export function applyTheme(theme: any, webBackground = false) {
  const oldconfig = getLocalStorageItem('config');
  const webTheme = getLocalStorageItem('theme');

  if (theme) {
    const webThemeIsDark = webTheme === 'dark';
    const themeCopy = { ...theme };
    if (webBackground) {
      const shadeColorDark = webThemeIsDark ? '--dark-primary-shade' : '--light-primary-shade';
      const themeParam = webThemeIsDark ? '--dark-primary' : '--light-primary';
      theme[shadeColorDark] = shadeHexColor(themeCopy[themeParam], -0.2);
    } else {
      const shadeColorLight = '--primary-shade';
      theme[shadeColorLight] = shadeHexColor(themeCopy['--primary'], -0.3);
    }
  }

  if (oldconfig && Object.keys(oldconfig).length > 0) {
    const oldconfigObject = JSON.parse(oldconfig);

    setLocalStorageConfig('config', { ...oldconfigObject, theme });
  } else {
    setLocalStorageConfig('config', { ...baseConfig, theme });
  }

  const root = document.documentElement;
  Object.keys(theme).forEach((cssVar) => {
    root.style.setProperty(cssVar, theme[cssVar]);
  });
}

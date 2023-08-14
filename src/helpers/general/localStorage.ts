export const getLocalStorageItem = (item: string) => window.localStorage.getItem(item);
export const setLocalStorageItem = (key: string, item: string) =>
  window.localStorage.setItem(key, item);
export const removeLocalStorageItem = (item: string) => window.localStorage.removeItem(item);

export const setLocalStorageConfig = (item: string, newconfig: object) =>
  window.localStorage.setItem(item, JSON.stringify(newconfig));

export const getItemFromConfig = (config: string, item: string) =>
  config ? JSON.parse(config)[item] : null;

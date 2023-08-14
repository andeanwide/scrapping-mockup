type MyObject<T> = {
  [key: string]: T;
};

export function getFilters<T>(filters: MyObject<T>) {
  let routeFilters = '';

  for (const [key, value] of Object.entries(filters)) {
    if (value instanceof Array) {
      if (value.length > 0) {
        const array = value.map((x) => `&${key}=${x}`);
        routeFilters += array.join('');
      }
      continue;
    }
    if (value !== '' && value !== null && value !== undefined) routeFilters += `&${key}=${value}`;
  }

  return routeFilters;
}

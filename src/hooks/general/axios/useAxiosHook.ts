import useAxios from 'axios-hooks';

const useAxiosGet = (endpoint: string) => {
  const [{ data, loading, error, response }, refetch] = useAxios(endpoint, {
    useCache: false,
  });
  return { data, loading, error, response, refetch };
};

const useAxiosGetLazy = () => {
  const [{ data, loading, error }, executeGet] = useAxios({ method: 'GET' }, { manual: true });
  return { data, loading, error, executeGet };
};

const useAxiosHookByRol = (endpoint = '') => {
  const [{ data, loading, error }, refetch] = useAxios(endpoint, {
    useCache: false,
  });
  return { data, loading, error, refetch };
};

const useAxiosPost = () => {
  const [{ loading }, executePost] = useAxios({ method: 'POST' }, { manual: true });

  return { loading, executePost };
};

const useAxiosPut = () => {
  const [{ loading }, executePut] = useAxios({ method: 'PUT' }, { manual: true });

  return { loading, executePut };
};

const useAxiosPatch = () => {
  const [{ loading, data }, executePatch] = useAxios({ method: 'PATCH' }, { manual: true });

  return { loading, data, executePatch };
};

const useAxiosDelete = () => {
  const [{ loading }, executeDel] = useAxios({ method: 'DELETE' }, { manual: true });

  return { loading, executeDel };
};

export {
  useAxiosGet,
  useAxiosHookByRol,
  useAxiosPost,
  useAxiosPut,
  useAxiosPatch,
  useAxiosGetLazy,
  useAxiosDelete,
};

export const getEnvironment = () => {
  const environments = import.meta.env;
  return {
    ...environments,
  };
};

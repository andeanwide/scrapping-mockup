const checkToken = (token: string) => {
  try {
    const dataLogin = JSON.parse(token);
    if (!dataLogin.isActive) return false;
    if (dataLogin.expired < Date.now()) {
      console.info('expired token');
      return false;
    }
  } catch (err) {
    console.info(err);
    return false;
  }
  return true;
};

const getDataFromToken = (token = '') => {
  try {
    return JSON.parse(token);
  } catch (error) {
    return false;
  }
};

export { checkToken, getDataFromToken };

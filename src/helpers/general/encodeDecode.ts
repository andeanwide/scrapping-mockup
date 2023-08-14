import CryptoJS from 'crypto-js';
import CryptoENC from 'crypto-js/enc-utf8';
import { getEnvironment } from './getEnvironment';

const { VITE_SECRET_HASH } = getEnvironment();

const encodeString = (string: string) => {
  const hash = CryptoJS.AES.encrypt(string, VITE_SECRET_HASH).toString();
  return { hash };
};

const decodeString = (string: string) => {
  try {
    const stringHash = CryptoJS.AES.decrypt(string.toString(), VITE_SECRET_HASH);
    const token = stringHash.toString(CryptoENC);
    return { token, errorMessage: null };
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export { encodeString, decodeString };

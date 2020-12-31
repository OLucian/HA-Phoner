import { config } from '../../config';
import CryptoJS from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
import { IPhone } from '../api/phones/types';

const getMetadata = (data: IPhone): { Data: string; Signature: string } => {
  const message = JSON.stringify(data);
  const encryptedData = CryptoJS.AES.encrypt(message, config.secret).toString();
  const Signature = CryptoJS.SHA3(message);
  const metadata = {
      Data: encryptedData,
      Signature: Base64.stringify(Signature),
  };
  return metadata;
};

export { getMetadata };

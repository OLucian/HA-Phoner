import { Knex } from '../../services/knex';
import { log } from '../../utils/logs';
import { IPhone } from './types';

const addNewPhone = async (phone: IPhone): Promise<any> => {
  try {
    await Knex('phones').insert(phone);
  } catch (error) {
    log.error('Error on inserting new phone', phone.serial);
    log.error(error);
    throw new Error(error);
  }
};

export { addNewPhone };

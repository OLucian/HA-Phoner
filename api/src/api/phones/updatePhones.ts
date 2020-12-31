import { Knex } from '../../services/knex';
import { log } from '../../utils/logs';
import { IPhone } from './types';

const updatePhones = async (id: string, update: IPhone): Promise<void> => {
  try {
    log.info('UPDATING PHONES');
    await Knex('phones')
      .where({ id })
      .update(update);
  } catch (error) {
    log.error('Error on updating phone', id);
    log.error(error);
    throw new Error(error);
  }
};

export { updatePhones };

import { Knex } from '../../services/knex';
import { log } from '../../utils/logs';

const deletePhone = async (ids: string[]): Promise<any> => {
  try {
    log.info('DELETING IDS: ', ids);
    await Knex('phones')
      .whereIn('id', ids)
      .del();
  } catch (error) {
    log.error('Error on deleting phone', ids);
    log.error(error);
    throw new Error(error);
  }
};

export { deletePhone };

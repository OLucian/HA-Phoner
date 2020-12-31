import { Knex } from '../../services/knex';
import { log } from '../../utils/logs';

const getPageCount = async (): Promise<any> => {
  try {
  log.info('GETTING PAGE COUNT');
  const data = await Knex('phones')
    .count('*');

  return data;
  } catch (error) {
    log.error('Error getting pagination count.');
    log.error(error);
    throw new Error(error);
  }
};

export { getPageCount };

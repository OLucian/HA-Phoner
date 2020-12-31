import { Knex } from '../../services/knex';
import { log } from '../../utils/logs';

const getPhones = async (page: number, size: number): Promise<any> => {
  try {
  const offset = page * size;
  log.info('GETTING PAGE:', page, 'SIZE:', size, 'OFFSET:', offset);
  const data = await Knex('phones')
    .select('id', 'type', 'serial', 'color', 'metadata', 'created_at', 'updated_at')
    .orderBy('updated_at', 'desc')
    .orderBy('id', 'desc')
    .limit(size)
    .offset(offset);

  return data;
  } catch (error) {
    log.error('Error getting phones with pagination.', 'PAGE:', page, 'SIZE', size);
    log.error(error);
    throw new Error(error);
  }
};

export { getPhones };

import * as Knex from 'knex';
import { phoneSeeder } from '../src/utils/phoneSeeder';

const tableName = 'phones';

export async function seed(knex: Knex): Promise<any> {
    return knex(tableName).del()
    .then(() => {
      const fillers = phoneSeeder(1000);
      return knex(tableName).insert(fillers);
    });
}

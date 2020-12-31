/* eslint-disable no-console */
import * as Knex from 'knex';
import { onUpdateTrigger } from '../knexutils';

const tableName = 'phones';

const on_update_timestamp = `
    CREATE OR REPLACE FUNCTION public.on_update_timestamp()
    RETURNS trigger
    LANGUAGE plpgsql
    AS $function$
    BEGIN
        NEW.updated_at = now();
        RETURN NEW;
    END;
    $function$
`;

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS PGCRYPTO')
    .raw(on_update_timestamp)
    .then(() => knex.schema
        .createTable(tableName, (table) => {
            table.string('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.string('type').notNullable();
            table.string('serial').unique().notNullable();
            table.string('color').notNullable();
            table.json('metadata').notNullable();
            table.timestamps(true, true);
            table.index(['id']);
            table.index(['type']);
            table.index(['serial']);
            table.index(['color']);
        }))
    .then(() => knex.raw(onUpdateTrigger(tableName)))
    .then(() => console.log('table created'))
    .catch((err) => console.log('Error: %s', err));
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(tableName);
}

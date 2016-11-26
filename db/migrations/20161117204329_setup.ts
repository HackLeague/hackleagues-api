import * as Knex from 'knex';

export function up(knex: Knex, Promise: any) {
  return Promise.all([
    // activate the uuid extension the database, don't forgot to add for production
    knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'),
    knex.schema.createTable('users', function (table: Knex.TableBuilder) {

      table.uuid('id')
        .unique()
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));

      table.string('email')
        .unique()
        .notNullable()
        .index();

      table.string('verifyEmailToken').nullable();
      table.string('username').nullable();
      table.json('roles');
      table.timestamps.call(table, true, true);
    })
  ]);
};

export function down(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};


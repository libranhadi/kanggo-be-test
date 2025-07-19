import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('roles', (table) => {
      table.increments('id').primary().notNullable();
      table.string('name', 100).notNullable().unique();
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('roles');
}
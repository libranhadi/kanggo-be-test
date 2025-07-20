import type { Knex } from 'knex';
require("dotenv").config();

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary().notNullable();
      
      table.string('fullname', 100).notNullable();
      table.string('cellphone', 20).notNullable();
      table.string('email', 50).notNullable().unique();
      table.string('password', 255).notNullable();
      
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
      
      table.integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('users');
}
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('orders', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      
      table.enum('status', ['paid', 'active', 'cancel', 'completed'])
        .notNullable()
        .defaultTo('paid');
      
      table.date('start_date').notNullable();
      table.date('end_date').notNullable();
      table.integer('total_day').notNullable();
      table.integer('total_price').notNullable();
      
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('orders');
}
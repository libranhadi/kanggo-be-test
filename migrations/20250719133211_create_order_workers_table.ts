import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('order_workers', (table) => {
      table.integer('order_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orders')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      
      table.integer('worker_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('workers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      
      table.primary(['order_id', 'worker_id']);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('order_workers');
}
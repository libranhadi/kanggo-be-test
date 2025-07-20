import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('workers', (table) => {
    table.timestamp('deleted_at')
      .nullable()
      .defaultTo(null)
      .comment('Soft delete timestamp');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('workers', (table) => {
    table.dropColumn('deleted_at');
  });
}
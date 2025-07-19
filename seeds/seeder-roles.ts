import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('roles').del();

  await knex('roles').insert([
    {
      name: 'admin',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      name: 'customer',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    }
  ]);
}
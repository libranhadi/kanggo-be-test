import type { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  const hashedPassword = await bcrypt.hash('P@ssword', 10);

  await knex('users').insert([
    {
      fullname: 'John Doe',
      cellphone: '081319811641',
      email: 'john@example.com',
      role_id: 1,
      password: hashedPassword,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    }
  ]);
}
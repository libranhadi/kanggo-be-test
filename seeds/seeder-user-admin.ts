import type { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Hash password
  const hashedPassword = await bcrypt.hash('P@ssword', 10);

  // Inserts seed entries
  await knex('users').insert([
    {
      full_name: 'John Doe',
      phone_number: '081319811641',
      email: 'john@example.com',
      role_id: 1,
      password: hashedPassword,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    }
  ]);
}
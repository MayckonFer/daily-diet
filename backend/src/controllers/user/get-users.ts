import { knex } from "../../database";

export async function getUser() {
  const users = await knex("users").select();

  return users;
}

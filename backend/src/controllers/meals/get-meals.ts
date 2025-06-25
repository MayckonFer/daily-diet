import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../../database";

export async function getMeals(request: FastifyRequest, reply: FastifyReply) {
  const user_id = request.user.id;
  const meals = await knex("meals").where({ user_id }).select();

  if (meals.length === 0) {
    return reply.status(400).send({
      message: "Não há refeições cadastradas ainda!",
    });
  }

  return meals;
}

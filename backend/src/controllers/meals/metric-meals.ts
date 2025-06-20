import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../../database";

export async function metricMeals(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user_id = request.user.id;
  const meals = await knex("meals").where({ user_id }).select();

  if (meals.length === 0) {
    return reply.status(400).send({
      message: "Não tem porra nhm",
    });
  }

  let currentSequence = 0;
  let bestSequence = 0;

  for (const meal of meals) {
    if (meal.isDiet) {
      // Continua a sequência
      currentSequence++;
      // Atualiza o maior valor se a sequência atual for maior
      if (currentSequence > bestSequence) {
        bestSequence = currentSequence;
      }
    } else {
      // Zera a sequência se sair da dieta
      currentSequence = 0;
    }
  }

  const metricsMeals = {
    totalMeals: meals.length,
    totalMealsOnDiet: meals.filter((meal) => !!meal.isDiet).length,
    totalMealsOutDiet: meals.filter((meal) => !meal.isDiet).length,
    bestSequence: bestSequence,
  };

  return { metricsMeals };
}

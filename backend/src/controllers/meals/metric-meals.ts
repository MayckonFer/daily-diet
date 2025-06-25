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
      message: "Não há refeições cadastradas no momento!",
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

  const totalMeals = meals.length;
  const totalMealsOnDiet = meals.filter((meal) => !!meal.isDiet).length;
  const totalMealsOutDiet = meals.filter((meal) => !meal.isDiet).length;

  const percentageOnDiet = Number(
    ((totalMealsOnDiet / totalMeals) * 100).toFixed(2)
  );
  const percentageOutDiet = Number(
    ((totalMealsOutDiet / totalMeals) * 100).toFixed(2)
  );

  const metricsMeals = {
    totalMeals,
    totalMealsOnDiet,
    totalMealsOutDiet,
    bestSequence: bestSequence,
    percentageOnDiet,
    percentageOutDiet,
  };

  return metricsMeals;
}

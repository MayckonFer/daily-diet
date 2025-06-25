import { FastifyRequest, FastifyReply } from "fastify";
import { knex } from "../../database";

export async function getMealsGroupedByDate(
  request: FastifyRequest,
  _reply: FastifyReply
) {
  const user_id = request.user.id;

  const meals = await knex("meals").where({ user_id }).select();

  const grouped: Record<string, typeof meals> = {};

  for (const meal of meals) {
    const date = new Date(meal.created_at);

    const dateBR = new Date(date.getTime() - 3 * 60 * 60 * 1000);

    const day = String(dateBR.getDate()).padStart(2, "0");
    const month = String(dateBR.getMonth() + 1).padStart(2, "0");
    const year = dateBR.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;

    if (!grouped[formattedDate]) {
      grouped[formattedDate] = [];
    }

    grouped[formattedDate].push(meal);
  }

  const mealsGroupByDate = Object.entries(grouped).map(([date, meals]) => ({
    date,
    meals,
  }));

  return mealsGroupByDate;
}

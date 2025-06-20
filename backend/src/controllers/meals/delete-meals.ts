import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../../database";
import { z, ZodError } from "zod";

export async function deleteMeals(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getMealsIdSchema = z.object({
    id: z.string().uuid(),
  });

  const user_id = request.user.id;

  try {
    const { id } = getMealsIdSchema.parse(request.params);

    const meal = await knex("meals").where({ id, user_id }).first();

    if (!meal) {
      return reply.status(404).send({ message: "Refeição não encontrada." });
    }

    if (meal?.user_id !== user_id) {
      return reply.status(400).send({
        message: "Você não pode ter acesso as refeições de outro usuário!",
      });
    }

    await knex("meals").where({ id }).delete();

    return reply
      .status(200)
      .send({ message: "Refeição deletada com sucesso!" });
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: error.errors.map((err) => err.message),
      });
    }

    return reply.status(500).send({ message: "Erro interno do servidor." });
  }
}

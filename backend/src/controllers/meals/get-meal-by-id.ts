import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../../database";
import { z, ZodError } from "zod";

export async function getMealById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getUserIdSchema = z.object({
    id: z.string().uuid(),
  });

  const user_id = request.user.id;

  try {
    const { id } = getUserIdSchema.parse(request.params);

    const meal = await knex("meals").where({ id, user_id }).first();

    if (meal?.user_id !== user_id) {
      return reply.status(400).send({
        message: "Você não pode ter acesso as refeições de outro usuário!",
      });
    }

    if (!meal) {
      return reply.status(404).send({
        message: "Refeição não encontrado.",
      });
    }

    return meal;
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: error.errors.map((err) => err.message),
      });
    }

    console.error("Erro inesperado:", error);
    return reply.status(500).send({
      message: "Erro interno do servidor.",
    });
  }
}

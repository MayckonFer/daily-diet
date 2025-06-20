import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../../database";
import { z, ZodError } from "zod";

export async function getUserById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getUserIdSchema = z.object({
    id: z.string().uuid(),
  });

  try {
    const { id } = getUserIdSchema.parse(request.params);

    const user = await knex("users").where("id", id).first();

    if (!user) {
      return reply.status(404).send({
        message: "Usuário não encontrado.",
      });
    }

    return user;
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

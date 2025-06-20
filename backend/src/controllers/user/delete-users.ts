import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../../database";
import { z, ZodError } from "zod";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const getUserIdSchema = z.object({
    id: z.string().uuid(),
  });

  try {
    const { id } = getUserIdSchema.parse(request.params);

    const user = await knex("users").where({ id }).first();

    if (!user) {
      return reply.status(404).send({ message: "Usuário não encontrado." });
    }

    await knex("users").where({ id }).delete();

    return reply.status(200).send({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: "ID inválido.",
        issues: error.errors,
      });
    }

    return reply.status(500).send({ message: "Erro interno do servidor." });
  }
}

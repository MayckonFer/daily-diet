import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { randomUUID } from "node:crypto";

import { knex } from "../../database";

export async function createMeals(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createMealsSchema = z.object({
    name: z.string().min(3, "Campo nome deve ter no minimo 3 caracteres!"),
    description: z
      .string()
      .min(3, "Descrição deve ter no minimo 3 caracteres!"),
    isDiet: z.boolean(),
  });

  const user_id = request.user.id;

  try {
    const { name, description, isDiet } = createMealsSchema.parse(request.body);

    const meals = await knex("meals")
      .where({ name, description, user_id })
      .first();

    if (meals) {
      return reply
        .status(400)
        .send({ message: "Já existe uma refeição com esses dados." });
    }

    await knex("meals").insert({
      id: randomUUID(),
      user_id,
      name,
      description,
      isDiet,
    });

    reply.status(201).send({
      message: "Refeição criada com sucesso!",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        messages: error.errors.map((err) => err.message),
      });
    }

    console.error("Erro inesperado:", error);
    return reply.status(500).send({
      message: "Erro interno do servidor.",
    });
  }
}

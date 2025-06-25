import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { knex } from "../../database";

export async function updateMeals(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getMealsIdSchema = z.object({
    id: z.string().uuid(),
  });

  const updateMealsSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    isDiet: z.boolean().optional(),
  });

  const user_id = request.user.id;

  try {
    const { id } = getMealsIdSchema.parse(request.params);
    const data = updateMealsSchema.parse(request.body);

    const meals = await knex("meals").where({ id, user_id }).first();

    if (!meals) {
      return reply.status(404).send({
        message: "Refeição não encontrada!",
      });
    }

    if (meals.user_id !== user_id) {
      return reply.status(400).send({
        message: "Você não pode ter acesso as refeições de outro usuário!",
      });
    }

    const changedFields = Object.entries(data).filter(([key, value]) => {
      return meals[key as keyof typeof meals] !== value;
    });

    if (changedFields.length === 0) {
      return reply.send({
        message: "Nenhuma alteração detectada. Dados mantidos!",
      });
    }

    await knex("meals").where({ id, user_id }).update(data);

    return reply.send({
      message: "Refeição atualizada com sucesso!",
      updatedFields: data,
    });
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

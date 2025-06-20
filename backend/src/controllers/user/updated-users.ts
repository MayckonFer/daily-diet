import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { knex } from "../../database";

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const getUserIdSchema = z.object({
    id: z.string().uuid(),
  });

  const updateUserSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório!").optional(),
    email: z.string().email("E-mail inválido!").optional(),
    password: z
      .string()
      .min(4, "O campo senha deve ter no minimo 4 caracteres!")
      .optional(),
  });

  try {
    const { id } = getUserIdSchema.parse(request.params);
    const data = updateUserSchema.parse(request.body);

    const user = await knex("users").where("id", id).first();

    if (!user) {
      return reply.status(404).send({
        message: "Usuário não encontrado.",
      });
    }

    const changedFields = Object.entries(data).filter(([key, value]) => {
      return user[key as keyof typeof user] !== value;
    });

    if (changedFields.length === 0) {
      return reply.send({
        message: "Nenhuma alteração detectada. Dados mantidos.",
      });
    }

    if (data.name) {
      const existingName = await knex("users")
        .where({ name: data.name })
        .andWhereNot("id", id)
        .first();

      if (existingName) {
        return reply
          .status(400)
          .send({ message: "Nome já cadastrado por outro usuário." });
      }
    }

    if (data.email) {
      const existingEmail = await knex("users")
        .where({ email: data.email })
        .andWhereNot("id", id)
        .first();

      if (existingEmail) {
        return reply
          .status(400)
          .send({ message: "E-mail já cadastrado por outro usuário." });
      }
    }

    await knex("users").where("id", id).update(data);

    return reply.send({
      message: "Usuário atualizado com sucesso.",
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

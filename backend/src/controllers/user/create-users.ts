import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { randomUUID } from "node:crypto";

import { knex } from "../../database";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const createUsersSchema = z.object({
    name: z.string().min(1, "Nome deve ter no minimo 3 caracteres"),
    email: z.string().email("E-mail invalido!"),
    password: z
      .string()
      .min(4, "O campo senha deve ter no minimo 4 caracteres!"),
  });

  try {
    const { name, email, password } = createUsersSchema.parse(request.body);

    const existingName = await knex("users").where({ name }).first();
    if (existingName) {
      return reply.status(400).send({ message: "Nome já cadastrado." });
    }

    const existingEmail = await knex("users").where({ email }).first();
    if (existingEmail) {
      return reply.status(400).send({ message: "E-mail já cadastrado." });
    }

    await knex("users").insert({
      id: randomUUID(),
      name,
      email,
      password,
    });

    reply.status(201).send({
      message: "Usuário criado com sucesso!",
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

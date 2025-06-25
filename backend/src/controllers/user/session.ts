import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { randomUUID } from "node:crypto";

import { knex } from "../../database";

export async function session(request: FastifyRequest, reply: FastifyReply) {
  const sessionSchema = z.object({
    email: z.string().email("E-mail invalido!"),
    password: z
      .string()
      .min(4, "O campo senha deve ter no minimo 4 caracteres!"),
  });

  try {
    const { email, password } = sessionSchema.parse(request.body);

    const user = await knex("users").where({ email, password }).first();

    if (!user) {
      return reply.status(404).send({
        message: "Usuário não encontrado",
      });
    }

    const sessionId = randomUUID();

    await knex("session").insert({
      session_id: sessionId,
      user_id: user.id,
    });

    reply.setCookie("session_id", sessionId, {
      path: "/", // define em quais rotas o cookie será enviado pelo navegador ('/' = todas)
      httpOnly: true, // impede que o cookie seja acessado via JS no navegador
      secure: process.env.NODE_ENV === "production", // o cookie só será enviado via HTTPS (true em produção)
      sameSite: "lax", // lax em desenvolvimento
      maxAge: 60 * 60 * 24, // 1 dia
    });

    reply.status(201).send({
      message: "Usuário logado com sucesso!",
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

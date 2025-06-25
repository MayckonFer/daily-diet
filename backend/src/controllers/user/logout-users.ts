import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

export async function logout(_request: FastifyRequest, reply: FastifyReply) {
  try {
    reply.clearCookie("session_id", {
      path: "/",
      httpOnly: true, // impede que o cookie seja acessado via JS no navegador
      secure: false, // o cookie só será enviado via HTTPS (true em produção)
      sameSite: "lax", // lax em desenvolvimento
      maxAge: 60 * 60 * 24,
    });

    return reply.code(200).send({
      statusCode: 200,
      message: "Logout realizado com sucesso.",
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

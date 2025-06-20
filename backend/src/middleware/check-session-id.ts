import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../database";

export async function checkSessionIdExist(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Validação de cookie como se fosse o token, se não tiver o sessionId ele não deixar passar
  const cookieSessionId = request.cookies.sessionId;

  if (!cookieSessionId) {
    return reply.status(401).send({
      error: "Unathorized.",
    });
  }

  const session = await knex("session")
    .where({ session_id: cookieSessionId })
    .first();

  request.user = { id: session?.user_id };
}

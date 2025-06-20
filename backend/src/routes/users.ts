import { FastifyInstance } from "fastify";

import { createUser } from "../controllers/user/create-users";
import { getUser } from "../controllers/user/get-users";
import { getUserById } from "../controllers/user/get-users-by-id";
import { deleteUser } from "../controllers/user/delete-users";
import { updateUser } from "../controllers/user/updated-users";
import { session } from "../controllers/user/session";

import { checkSessionIdExist } from "../middleware/check-session-id";

export async function userRoutes(app: FastifyInstance) {
  app.post("/create", createUser);
  app.post("/session", session);
  app.get("/list", { preHandler: [checkSessionIdExist] }, getUser);
  app.get("/list/:id", { preHandler: [checkSessionIdExist] }, getUserById);
  app.delete("/delete/:id", { preHandler: [checkSessionIdExist] }, deleteUser);
  app.put("/updated/:id", { preHandler: [checkSessionIdExist] }, updateUser);
}

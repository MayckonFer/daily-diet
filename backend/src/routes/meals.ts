import { FastifyInstance } from "fastify";

import { checkSessionIdExist } from "../middleware/check-session-id";

import { createMeals } from "../controllers/meals/create-meals";
import { getMeals } from "../controllers/meals/get-meals";
import { getMealById } from "../controllers/meals/get-meal-by-id";
import { deleteMeals } from "../controllers/meals/delete-meals";
import { metricMeals } from "../controllers/meals/metric-meals";
import { updateMeals } from "../controllers/meals/updated-meals";

export async function mealRoutes(app: FastifyInstance) {
  app.post("/create", { preHandler: [checkSessionIdExist] }, createMeals);
  app.get("/list", { preHandler: [checkSessionIdExist] }, getMeals);
  app.get("/list/:id", { preHandler: [checkSessionIdExist] }, getMealById);
  app.get("/metrics", { preHandler: [checkSessionIdExist] }, metricMeals);
  app.delete("/delete/:id", { preHandler: [checkSessionIdExist] }, deleteMeals);
  app.put("/updated/:id", { preHandler: [checkSessionIdExist] }, updateMeals);
}

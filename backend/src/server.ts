import fastify from "fastify";
import cookie from "@fastify/cookie";

import { userRoutes } from "./routes/users";
import { env } from "./env";
import { mealRoutes } from "./routes/meals";

const app = fastify();

app.register(cookie);

app.register(userRoutes, {
  prefix: "user",
});

app.register(mealRoutes, {
  prefix: "meal",
});

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server is running in port ${env.PORT}`);
  });

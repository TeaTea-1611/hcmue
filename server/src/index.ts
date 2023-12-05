import "reflect-metadata";
import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";
import type { ListenOptions } from "net";
import { dataSource } from "./data-source";
import { User } from "./entities/index";
import { createSchema } from "./schema";
import { Context } from "./types/context";
import RedisStore from "connect-redis";
import redis from "./redis";
import session from "express-session";
import { COOKIE_NAME, __prod__ } from "./constants";
import { seed } from "./seed";

export const createApolloServer = async (
  listenOptions: ListenOptions = { port: 4000 }
) => {
  const app = express();

  await dataSource.initialize();

  await seed();

  const httpServer = http.createServer(app);

  app.use(
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );
  app.use(cookieParser());

  let redisStore = new RedisStore({
    client: redis,
  });

  app.use(
    session({
      name: COOKIE_NAME,
      store: redisStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax",
      },
      secret: process.env.SESSION_SECRET as string,
      saveUninitialized: false,
      resave: false,
    })
  );

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();

  app.use(
    "/",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000"],
      credentials: true,
    }),
    express.json({ limit: "100mb" }),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }: Context): Promise<Context> => {
        let user = null;

        if (req.session.userId) {
          user = await dataSource
            .getRepository(User)
            .findOneBy({ id: req.session.userId });
        }

        return {
          req,
          res,
          user,
        };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: listenOptions.port }, resolve)
  );

  return { apolloServer, port: listenOptions.port };
};

(async () => {
  const { port } = await createApolloServer({ port: 4000 });
  console.log(`🚀  Server ready at port: ${port}`);
})()
  .then()
  .catch();

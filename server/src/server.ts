import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { User } from "@prisma/client";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config.js";
import express from "express";
import http from "http";
import jwt from "jsonwebtoken";
import type { ListenOptions } from "net";
import { RT_COOKIE_NAME } from "./constants.js";
import { prisma } from "./db.js";
import { schema } from "./schema.js";
import { MyContext } from "./types/MyContext.js";
import { createAccessToken, createRefreshToken } from "./utils/auth.js";
import { sendRefreshToken } from "./modules/auth/utils/sendRefreshToken.js";

export const createApolloServer = async (
  listenOptions: ListenOptions = { port: 4000 }
) => {
  const app = express();

  const httpServer = http.createServer(app);

  app.use(
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );
  app.use(cookieParser());

  app.post("/refresh-token", async (req, res) => {
    const token = req.cookies[RT_COOKIE_NAME];
    if (!token) {
      return res.send({ success: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      console.log(err);
      return res.send({ success: false, accessToken: "" });
    }

    const user = await prisma.user.findFirst({ where: { id: payload.userId } });

    if (!user) {
      return res.send({ success: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ success: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user.id, user.tokenVersion));

    return res.send({ success: true, accessToken: createAccessToken(user.id) });
  });

  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000"],
      credentials: true,
    }),
    express.json({ limit: "50mb" }),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }): Promise<MyContext> => {
        const token = req.headers["authorization"]?.split(" ")?.[1];

        let user: User = null;

        if (token) {
          try {
            const decoded = jwt.verify(
              token,
              process.env.ACCESS_TOKEN_SECRET
            ) as {
              userId?: number;
            };

            user = await prisma.user.findFirst({
              where: { id: decoded.userId },
              include: { role: true },
            });
          } catch {
            user = null;
          }
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

if (process.env.NODE_ENV !== "test") {
  const { port } = await createApolloServer({ port: 4000 });
  console.log(`🚀  Server ready at port: ${port}`);
}

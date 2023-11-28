import { GraphQLError } from "graphql";
import { Context } from "../types/context.js";
import { MiddlewareFn } from "type-graphql";

export const checkAuth: MiddlewareFn<Context> = async (
  { context: { user } },
  next
) => {
  if (!user)
    throw new GraphQLError("Not authenticated to perform GraphQL operations");

  return next();
};

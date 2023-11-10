import { MyContext } from "../../types/MyContext";
import { authService } from "./auth.service.js";
import { LoginInput } from "./dto/login.input";
import { sendRefreshToken } from "./utils/sendRefreshToken.js";

export const authResolver = {
  Query: {
    me: (_, _args, ctx: MyContext) => {
      return ctx.user;
    },
  },
  Mutation: {
    login: async (
      _,
      { loginInput }: { loginInput: LoginInput },
      { res }: MyContext
    ) => {
      return authService.login(res, loginInput);
    },
    logout: (_, __, { res }: MyContext) => {
      sendRefreshToken(res, "");
      return true;
    },
  },
};

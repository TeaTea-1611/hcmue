import { dataSource } from "../data-source";
import { User } from "../entities";
import { Context } from "../types/context";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { type Repository } from "typeorm";
import { LoginInput, LoginMutationResponse } from "./types";
import * as argon2 from "argon2";
import { COOKIE_NAME } from "../constants";

@Resolver(User)
export class AuthResolver {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = dataSource.getRepository(User);
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { user }: Context) {
    return user;
  }

  @Mutation(() => LoginMutationResponse)
  async login(
    @Arg("loginInput") { username, password }: LoginInput,
    @Ctx() { req }: Context
  ): Promise<LoginMutationResponse> {
    try {
      const user = await this.userRepository.findOneBy({ username });

      if (!user || !(await argon2.verify(user.password, password)))
        throw new Error("Tài khoản hoặc mật khẩu không chính xác");

      req.session.userId = user.id;

      return {
        success: true,
        message: "Đăng nhập thành công",
        user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: Context) {
    return new Promise((resolve, _reject) => {
      res.clearCookie(COOKIE_NAME);

      req.session.destroy((error) => {
        if (error) {
          console.log("DESTROYING SESSION ERROR", error);
          resolve(false);
        }
        resolve(true);
      });
    });
  }
}

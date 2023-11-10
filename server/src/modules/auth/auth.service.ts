import { Response } from "express";
import { prisma } from "../../db.js";
import * as argon2 from "argon2";
import { createAccessToken, createRefreshToken } from "./utils/auth.js";
import { sendRefreshToken } from "./utils/sendRefreshToken.js";
import { LoginInput } from "./dto/login.input.js";

class AuthService {
  async revokeRefreshTokenForUser(userId: number) {
    await prisma.user.update({
      where: { id: userId },
      data: { tokenVersion: { increment: 1 } },
    });
    return true;
  }

  async login(res: Response, { username, password }: LoginInput) {
    try {
      const user = await prisma.user.findFirst({
        where: { username },
        include: { role: true },
      });

      if (!user || !(await argon2.verify(user.password, password)))
        throw new Error("invalid username or password");

      const accessToken = createAccessToken(user.id);
      const refreshToken = createRefreshToken(user.id, user.tokenVersion);

      sendRefreshToken(res, refreshToken);

      return {
        success: true,
        message: "logged successfully",
        accessToken,
        user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

export const authService = new AuthService();

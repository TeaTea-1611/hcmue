import { object, string } from "yup";
import { prisma } from "../../db.js";
import * as argon2 from "argon2";
import { formatYupError } from "../../utils/formatYupError.js";

class UsersService {
  async create(username: string, password: string, roleId: string) {
    try {
      try {
        await object()
          .shape({
            username: string().required().min(6).max(20),
            password: string().required().min(6).max(30),
            roleId: string().required(),
          })
          .validate({ username, password, roleId }, { abortEarly: false });
      } catch (error) {
        return {
          success: false,
          message: "validation errors",
          errors: formatYupError(error),
        };
      }

      const userAlreadyExists = await prisma.user.findFirst({
        where: { username: username },
      });

      if (userAlreadyExists)
        return {
          success: false,
          errors: [{ path: "username", message: "username already exists" }],
        };

      const hashPassword = await argon2.hash(password);

      const user = await prisma.user.create({
        data: {
          username: username,
          password: hashPassword,
          roleId: roleId,
        },
        include: { role: true },
      });

      return {
        success: true,
        message: "user created successfully",
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

export const usersService = new UsersService();

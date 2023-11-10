import * as argon2 from "argon2";
import { prisma } from "../../db.js";
import { ROLE } from "../users/types/role.js";
import { CreateLecturerInput } from "./dto/create-lecturer.input.js";

class LecturersService {
  async create({
    username,
    password,
    positionId,
    facultyId,
    ...values
  }: CreateLecturerInput) {
    try {
      const errors = [];

      if (await prisma.lecturer.findFirst({ where: { id: values.id } })) {
        errors.push({ path: "id", message: "lecturer id already exists" });
      }

      if (await prisma.user.findFirst({ where: { username } })) {
        errors.push({
          path: "username",
          message: "username id already exists",
        });
      }

      if (errors.length) {
        return {
          success: false,
          errors,
        };
      }

      const hashPassword = await argon2.hash(password);

      const lecturer = await prisma.lecturer.create({
        data: {
          ...values,

          ...(positionId
            ? {
                position: {
                  connect: {
                    id: positionId,
                  },
                },
              }
            : {}),

          faculty: {
            connect: {
              id: facultyId,
            },
          },
          user: {
            create: {
              username,
              password: hashPassword,
              roleId: ROLE.LECTURER,
            },
          },
        },
      });

      return {
        success: true,
        message: "lecturer created successfully",
        lecturer,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async delete(id: string) {
    try {
      const delLecturer = prisma.lecturer.delete({ where: { id } });
      const delUser = prisma.user.delete({ where: { username: id } });

      await prisma.$transaction([delLecturer, delUser]);

      return {
        success: true,
        message: "lecturer deleted successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

export const lecturersService = new LecturersService();

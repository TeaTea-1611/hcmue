import * as argon2 from "argon2";
import { prisma } from "../../db.js";

import { ROLE } from "../users/types/role.js";
import { CreateStudentInput } from "./dto/create-student.input.js";

class StudentsService {
  async create({
    username,
    password,
    classId,
    positionId,
    courseId,
    facultyId,
    trainingFieldId,
    ...values
  }: CreateStudentInput) {
    try {
      const errors = [];

      if (await prisma.student.findFirst({ where: { id: values.id } })) {
        errors.push({ path: "id", message: "student id already exists" });
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

      const student = await prisma.student.create({
        data: {
          ...values,
          trainingField: {
            connect: {
              id: trainingFieldId,
            },
          },
          class: {
            connect: {
              id: classId,
            },
          },
          ...(positionId
            ? {
                position: {
                  connect: {
                    id: positionId,
                  },
                },
              }
            : {}),
          course: {
            connect: {
              id: courseId,
            },
          },
          faculty: {
            connect: {
              id: facultyId,
            },
          },
          user: {
            create: {
              username,
              password: hashPassword,
              roleId: ROLE.STUDENT,
            },
          },
        },
      });

      return {
        success: true,
        message: "student created successfully",
        student,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

export const studentsService = new StudentsService();

import { prisma } from "../../db.js";
import { CreateSemesterInput } from "./dto/create-semester.input.js";

export const semestersResolver = {
  Query: {
    semesters: async (_, { academicYearId }: { academicYearId: number }) => {
      return await prisma.semester.findMany({
        where: { academicYearId },
      });
    },
  },
  Mutation: {
    createSemester: async (
      _,
      { name, academicYearId }: CreateSemesterInput
    ) => {
      if (
        await prisma.semester.findFirst({
          where: {
            name,
            academicYearId,
          },
        })
      )
        return {
          success: false,
          errors: [
            { path: "name", message: "semester already exists" },
            { path: "academic-year", message: "academic year already exists" },
          ],
        };

      const academicYear = await prisma.semester.create({
        data: {
          name,
          academicYear: {
            connect: {
              id: academicYearId,
            },
          },
        },
      });

      return {
        success: true,
        message: "semester created successfully",
        academicYear,
      };
    },
    deleteSemester: async (_, { id }: { id: number }) => {
      try {
        await prisma.semester.delete({ where: { id } });
        return {
          success: true,
          message: "semester deleted successfully",
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },
  },
};

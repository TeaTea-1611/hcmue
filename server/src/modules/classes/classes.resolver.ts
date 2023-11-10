import { Class } from "@prisma/client";
import { prisma } from "../../db.js";

export const classesResolver = {
  Query: {
    classes: async () => {
      return await prisma.class.findMany({
        orderBy: { name: "desc" },
      });
    },
  },
  Mutation: {
    // createAcademicYear: async (
    //   _,
    //   {
    //     createAcademicYear: { name },
    //   }: {
    //     createAcademicYear: CreateAcademicYear;
    //   }
    // ) => {
    //   if (await prisma.academicYear.findFirst({ where: { name } }))
    //     return {
    //       success: false,
    //       errors: [{ path: "name", message: "academic year already exists" }],
    //     };
    //   const academicYear = await prisma.academicYear.create({
    //     data: {
    //       name: name,
    //     },
    //   });
    //   return {
    //     success: true,
    //     message: "academic year created successfully",
    //     academicYear,
    //   };
    // },
    // deleteAcademicYear: async (_, { id }: { id: number }) => {
    //   try {
    //     await prisma.academicYear.delete({ where: { id } });
    //     return {
    //       success: true,
    //       message: "academic year deleted successfully",
    //     };
    //   } catch (error) {
    //     return {
    //       success: false,
    //       message: error.message,
    //     };
    //   }
    // },
  },
  Class: {
    course: async (parent: Class) => {
      return await prisma.course.findFirst({ where: { id: parent.courseId } });
    },
  },
};

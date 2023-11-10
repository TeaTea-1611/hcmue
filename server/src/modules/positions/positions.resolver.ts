import { prisma } from "../../db.js";

export const positionsResolver = {
  Query: {
    positions: async (_, args: { roleId: string }) => {
      return await prisma.position.findMany({
        where: { roleId: args.roleId },
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
};
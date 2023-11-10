import { prisma } from "../../db.js";

export const trainingProgramsResolver = {
  Query: {
    trainingPrograms: async () => {
      return await prisma.trainingProgram.findMany();
    },
  },
};

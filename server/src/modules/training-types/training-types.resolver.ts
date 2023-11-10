import { prisma } from "../../db.js";

export const trainingTypesResolver = {
  Query: {
    trainingTypes: async () => {
      return await prisma.trainingType.findMany();
    },
  },
};

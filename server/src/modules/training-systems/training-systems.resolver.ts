import { prisma } from "../../db.js";

export const trainingSystemsResolver = {
  Query: {
    trainingSystems: async () => {
      return await prisma.trainingSystem.findMany();
    },
  },
};

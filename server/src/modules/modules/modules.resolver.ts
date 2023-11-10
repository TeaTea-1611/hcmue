import { prisma } from "../../db.js";
import { CreateModuleInput } from "./dto/create-module.input.js";
import { modulesService } from "./modules.service.js";

export const modulesResolver = {
  Query: {
    modules: async () => {
      return await prisma.module.findMany();
    },
  },
  Mutation: {
    createModule: (
      _,
      { createModuleInput }: { createModuleInput: CreateModuleInput }
    ) => {
      return modulesService.create(createModuleInput);
    },
    deleteModule: (_, { id }: { id: string }) => {
      return modulesService.delete(id);
    },
  },
};

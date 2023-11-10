import { prisma } from "../../db.js";
import { CreateModuleClassInput } from "./dto/create-module-class.input.js";
import { moduleClassesService } from "./module-classes.service.js";

export const moduleClassesResolver = {
  Query: {
    moduleClasses: async () => {
      return await prisma.moduleClass.findMany();
    },
  },
  Mutation: {
    createModuleClass: (
      _,
      {
        createModuleClassInput,
      }: { createModuleClassInput: CreateModuleClassInput }
    ) => {
      return moduleClassesService.create(createModuleClassInput);
    },
    deleteModuleClass: (_, { id }: { id: number }) => {
      return moduleClassesService.delete(id);
    },
  },
};

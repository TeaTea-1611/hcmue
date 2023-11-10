import { prisma } from "../../db.js";
import { CreateModuleInput } from "./dto/create-module.input.js";

class ModulesService {
  async create({ id, facultyId, name, credits }: CreateModuleInput) {
    try {
      const errors = [];

      if (await prisma.module.findFirst({ where: { id } })) {
        errors.push({ path: "id", message: "id already exists" });
      }
      if (await prisma.module.findFirst({ where: { name } })) {
        errors.push({ path: "name", message: "id already exists" });
      }

      if (errors.length) {
        return {
          success: false,
          errors,
        };
      }

      const module = await prisma.module.create({
        data: {
          id,
          name,
          credits,
          faculty: {
            connect: {
              id: facultyId,
            },
          },
        },
      });

      return {
        success: true,
        message: "module created successfully",
        module,
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
      await prisma.module.delete({ where: { id } });
      return {
        success: true,
        message: "module deleted successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

export const modulesService = new ModulesService();

import { prisma } from "../../db.js";
import { CreateModuleClassInput } from "./dto/create-module-class.input.js";

class ModuleClassesService {
  async create({
    classStart,
    classEnd,
    lecturerId,
    maximum,
    moduleId,
    schoolDay,
    semesterId,
    startDate,
    startEnd,
    room,
    testDate,
  }: CreateModuleClassInput) {
    try {
      const errors = [];

      // if (await prisma.module.findFirst({ where: { id } })) {
      //   errors.push({ path: "id", message: "id already exists" });
      // }
      // if (await prisma.module.findFirst({ where: { name } })) {
      //   errors.push({ path: "name", message: "id already exists" });
      // }

      if (errors.length) {
        return {
          success: false,
          errors,
        };
      }

      const moduleClass = await prisma.moduleClass.create({
        data: {
          module: {
            connect: {
              id: moduleId,
            },
          },
          classStart,
          classEnd,
          maximum,
          schoolDay,
          startDate,
          startEnd,
          semester: {
            connect: {
              id: semesterId,
            },
          },
          lecturer: {
            connect: {
              id: lecturerId,
            },
          },
          room,
          testDate,
        },
      });

      return {
        success: true,
        message: "module class created successfully",
        moduleClass,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
  async delete(id: number) {
    try {
      await prisma.moduleClass.delete({ where: { id } });
      return {
        success: true,
        message: "module class deleted successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

export const moduleClassesService = new ModuleClassesService();

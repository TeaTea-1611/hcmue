import { prisma } from "../../db.js";
import { CreateUserInput } from "./dto/create-user.input.js";
import { usersService } from "./users.service.js";

export const usersResolver = {
  Query: {
    users: async (_: any, args: { page: number; limit: number }) => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    createUser: async (_, { username, password, roleId }: CreateUserInput) => {
      return usersService.create(username, password, roleId);
    },
    deleteUser: async (_, args: { id: number }) => {
      const deleteUser = prisma.user.delete({ where: { id: args.id } });
      await prisma.$transaction([deleteUser]);
      return {
        success: true,
        message: "user deleted successfully",
      };
    },
  },
};

import { Faculty } from "@prisma/client";
import { prisma } from "../../db.js";
import { lecturersService } from "./lecturers.service.js";
import { CreateLecturerInput } from "./dto/create-lecturer.input.js";

export const lecturersResolver = {
  Query: {
    lecturers: async (_, args) => {
      return await prisma.lecturer.findMany();
    },
  },
  Mutation: {
    createLecturer: (
      _,
      { createLecturerInput }: { createLecturerInput: CreateLecturerInput }
    ) => {
      return lecturersService.create(createLecturerInput);
    },
    deleteLecturer: (_, { id }: { id: string }) => {
      return lecturersService.delete(id);
    },
  },
};

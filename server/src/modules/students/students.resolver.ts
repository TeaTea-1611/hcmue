import { Student } from "@prisma/client";
import { prisma } from "../../db.js";
import { CreateStudentInput } from "./dto/create-student.input.js";
import { studentsService } from "./students.service.js";

export const studentsResolver = {
  Query: {
    paginatedStudents: async (
      _,
      {
        pageIndex = 0,
        take = 10,
        studentId,
      }: { pageIndex?: number; take?: number; studentId?: string }
    ) => {
      const rTake = Math.min(take, 20);
      const where = studentId ? { id: { contains: studentId } } : {};

      const totalCount = await prisma.student.count({ where });

      const students = await prisma.student.findMany({
        where,
        take: rTake,
        skip: pageIndex * rTake,
      });
      return { students, totalCount };
    },
    students: async (_, args) => {
      return await prisma.student.findMany();
    },
  },
  Mutation: {
    createStudent: (
      _,
      { createStudentInput }: { createStudentInput: CreateStudentInput }
    ) => {
      return studentsService.create(createStudentInput);
    },
  },
  Student: {
    faculty: async (parent: Student) => {
      return await prisma.faculty.findFirst({
        where: { id: parent.facultyId },
      });
    },
    course: async (parent: Student) => {
      return await prisma.course.findFirst({ where: { id: parent.courseId } });
    },
    class: async (parent: Student) => {
      return await prisma.class.findFirst({ where: { id: parent.classId } });
    },
    position: async (parent: Student) => {
      if (!parent.positionId) return null;
      return await prisma.position.findFirst({
        where: { id: parent.positionId },
      });
    },
  },
};

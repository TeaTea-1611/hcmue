import {
  Prisma,
  TrainingField,
  TrainingFieldToProgramToCourse,
} from "@prisma/client";
import { prisma } from "../../db.js";

export const trainingFieldsResolver = {
  Query: {
    trainingFields: async () => {
      return await prisma.trainingField.findMany();
    },
  },
  TrainingField: {
    faculty: async (parent: TrainingField) => {
      return await prisma.faculty.findFirst({
        where: { id: parent.facultyId },
      });
    },
    courses: async (parent: TrainingField) => {
      const trainingFieldToCourse = await prisma.trainingFieldToCourse.findMany(
        {
          where: { trainingFieldId: parent.id },
          include: {
            course: true,
          },
        }
      );
      return trainingFieldToCourse.map((item) => item.course);
    },
    trainingSystem: async (parent: TrainingField) => {
      return await prisma.trainingSystem.findFirst({
        where: { id: parent.trainingSystemId },
      });
    },
    trainingType: async (parent: TrainingField) => {
      return await prisma.trainingType.findFirst({
        where: { id: parent.trainingTypeId },
      });
    },
    trainingFieldToProgramToCourse: async (parent: TrainingField) => {
      return await prisma.trainingFieldToProgramToCourse.findMany({
        where: { trainingFieldId: parent.id },
      });
    },
  },
  TrainingFieldToProgramToCourse: {
    trainingField: async (parent: TrainingFieldToProgramToCourse) => {
      return await prisma.trainingField.findFirst({
        where: { id: parent.trainingFieldId },
      });
    },
    trainingProgram: async (parent: TrainingFieldToProgramToCourse) => {
      return await prisma.trainingProgram.findFirst({
        where: { id: parent.trainingProgramId },
      });
    },
    course: async (parent: TrainingFieldToProgramToCourse) => {
      return await prisma.course.findFirst({
        where: { id: parent.courseId },
      });
    },
  },
};

import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "./middlewares/permissions.js";
import { academicYearsResolver } from "./modules/academic-years/academic-years.resolver.js";
import { academicYearsTypeDefs } from "./modules/academic-years/academic-years.type-defs.js";
import { authResolver } from "./modules/auth/auth.resolver.js";
import { authTypeDefs } from "./modules/auth/auth.type-defs.js";
import { classesResolver } from "./modules/classes/classes.resolver.js";
import { classesTypeDefs } from "./modules/classes/classes.type-defs.js";
import { coursesResolver } from "./modules/courses/courses.resolver.js";
import { courseTypeDefs } from "./modules/courses/courses.type-defs.js";
import { facultiesResolver } from "./modules/faculties/faculties.resolver.js";
import { facultiesTypeDefs } from "./modules/faculties/faculties.type-defs.js";
import { modulesResolver } from "./modules/modules/modules.resolver.js";
import { modulesTypeDefs } from "./modules/modules/modules.type-defs.js";
import { positionsResolver } from "./modules/positions/positions.resolver.js";
import { positionsTypeDefs } from "./modules/positions/positions.type-defs.js";
import { semestersResolver } from "./modules/semesters/semesters.resolver.js";
import { semestersTypeDefs } from "./modules/semesters/semesters.tpe-defs.js";
import { studentsResolver } from "./modules/students/students.resolver.js";
import { studentsTypeDefs } from "./modules/students/students.type-defs.js";
import { trainingFieldsResolver } from "./modules/training-fields/training-fields.resolver.js";
import { trainingFieldsTypeDefs } from "./modules/training-fields/training-fields.type-defs.js";
import { trainingProgramsResolver } from "./modules/training-programs/training-programs.resolver.js";
import { trainingProgramsTypeDefs } from "./modules/training-programs/training-programs.type-defs.js";
import { trainingSystemsResolver } from "./modules/training-systems/training-systems.resolver.js";
import { trainingSystemsTypeDefs } from "./modules/training-systems/training-systems.type-defs.js";
import { trainingTypesResolver } from "./modules/training-types/training-types.resolver.js";
import { trainingTypesTypeDefs } from "./modules/training-types/training-types.type-defs.js";
import { usersResolver } from "./modules/users/users.resolver.js";
import { usersTypeDefs } from "./modules/users/users.type-defs.js";
import { lecturersTypeDefs } from "./modules/lecturers/lecturers.type-defs.js";
import { lecturersResolver } from "./modules/lecturers/lecturers.resolver.js";

const responsesTypeDefs = `#graphql
  type FieldError { 
    path: String! 
    message: String! 
  }

  interface MutationResponse {
    success: Boolean!
    message: String
  }
`;

export const typeDefs = [
  `#graphql
    scalar Date
  `,
  responsesTypeDefs,
  usersTypeDefs,
  authTypeDefs,
  semestersTypeDefs,
  academicYearsTypeDefs,
  facultiesTypeDefs,
  studentsTypeDefs,
  courseTypeDefs,
  classesTypeDefs,
  positionsTypeDefs,
  trainingFieldsTypeDefs,
  trainingSystemsTypeDefs,
  trainingTypesTypeDefs,
  trainingProgramsTypeDefs,
  modulesTypeDefs,
  lecturersTypeDefs,
];

const resolvers = [
  usersResolver,
  authResolver,
  studentsResolver,
  academicYearsResolver,
  semestersResolver,
  coursesResolver,
  facultiesResolver,
  classesResolver,
  positionsResolver,
  trainingFieldsResolver,
  trainingSystemsResolver,
  trainingTypesResolver,
  trainingProgramsResolver,
  modulesResolver,
  // lecturersResolver,
];

export const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  permissions
);

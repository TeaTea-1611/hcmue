import { AuthChecker, buildSchema } from "type-graphql";
import {
  AuthResolver,
  FacultiesResolver,
  LecturersResolver,
  CoursesResolver,
  EducationalFieldsResolver,
  EducationalProgramsResolver,
  EducationalSystemsResolver,
  ClassesResolver,
  StudentsResolver,
} from "./resolvers";
import { Context } from "./types/context";

export const customAuthChecker: AuthChecker<Context> = async (
  { context: { user } },
  roles
) => {
  if (!user) return false;

  return roles.includes(user.role);
};

export const createSchema = async () =>
  await buildSchema({
    resolvers: [
      AuthResolver,
      FacultiesResolver,
      CoursesResolver,
      StudentsResolver,
      LecturersResolver,
      EducationalFieldsResolver,
      EducationalProgramsResolver,
      EducationalSystemsResolver,
      ClassesResolver,
    ],
    authChecker: customAuthChecker,
    validate: false,
  });

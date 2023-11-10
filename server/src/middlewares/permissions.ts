import { shield, rule, allow } from "graphql-shield";
import { MyContext } from "../types/MyContext";
import { ROLE } from "../modules/users/types/role.js";

const isAuthenticated = rule()(async (parent, args, ctx: MyContext, info) => {
  return !!ctx.user;
});

const isAdmin = rule()(async (parent, args, ctx: MyContext, info) => {
  return ctx.user.roleId === ROLE.ADMIN;
});

const isStudent = rule()(async (parent, args, ctx: MyContext, info) => {
  return ctx.user.roleId === ROLE.STUDENT;
});

export const permissions = shield({
  Query: {
    "*": allow,
    paginatedStudents: isAuthenticated,
  },
  Mutation: {
    "*": allow,
    // createFaculty: isAdmin,
    // updateFaculty: isAdmin,
    // deleteFaculty: isAdmin,

    // createAcademicYear: isAdmin,
    // deleteAcademicYear: isAdmin,

    // createStudent: isAdmin,
  },
});

import { DataSource } from "typeorm";
import {
  User,
  Class,
  Department,
  Faculty,
  Lecturer,
  Staff,
  Course,
  Student,
  EducationalField,
  EducationalProgram,
  EducationalSystem,
} from "./entities";
import { __prod__ } from "./constants";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  url: process.env.DB,
  synchronize: __prod__ ? false : true,
  logging: false,
  ssl: true,
  entities: [
    User,
    Course,
    Class,
    Department,
    Faculty,
    Lecturer,
    Staff,
    Student,
    EducationalField,
    EducationalProgram,
    EducationalSystem,
  ],
  migrations: [],
  subscribers: [],
});

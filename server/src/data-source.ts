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
  username: "postgres",
  password: "161102",
  database: "university-management",
  synchronize: __prod__ ? false : true,
  logging: false,
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

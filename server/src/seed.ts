import { dataSource } from "./data-source.js";
import { User } from "./entities/index.js";
import { Role } from "./entities/types/role.js";
import * as argon2 from "argon2";

export const seed = async () => {
  try {
    const hashPassword = await argon2.hash("161102");

    await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        username: "admin",
        password: hashPassword,
        role: Role.Admin,
      })
      .orUpdate(["username"], ["username"], {
        skipUpdateIfNoValuesChanged: true,
      })
      .execute();
    console.log("Admin account created successfully");
  } catch (error) {
    console.log("Admin account already exists");
  }
};

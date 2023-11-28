import { Role } from "./types/role.js";
import { Field, ID, ObjectType } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@ObjectType()
@Entity({ name: "users" })
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Index()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Field()
  @Column("enum", { enum: Role })
  role: Role;
}

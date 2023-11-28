import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Faculty } from "./faculty";
import { Course } from "./course";
import { Lecturer } from "./lecturer";

@ObjectType()
@Entity({ name: "classes" })
export class Class {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => Faculty)
  @ManyToOne(() => Faculty)
  @JoinColumn({ name: "facultyId" })
  faculty: Faculty;

  @Column()
  facultyId: number;

  @Field(() => Course)
  @ManyToOne(() => Course)
  @JoinColumn({ name: "courseId" })
  course: Course;

  @Column()
  courseId: number;

  @Field(() => Lecturer)
  @ManyToOne(() => Lecturer)
  @JoinColumn({ name: "academicAdvisorId" })
  academicAdvisor: Lecturer;

  @Column()
  academicAdvisorId: string;
}

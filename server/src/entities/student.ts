import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Class } from "./class";
import { Course } from "./course";
import { EducationalField } from "./educational-field";
import { EducationalProgram } from "./educational-program";
import { Faculty } from "./faculty";
import { User } from "./user";

@ObjectType()
@Entity({ name: "students" })
export class Student {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  fullName: string;

  @Field()
  @Column()
  dob: string;

  @Field()
  @Column()
  pob: string;

  @Field()
  @Column()
  gender: string;

  @Field()
  @Column()
  position: string;

  @Field()
  @Column()
  ethnicity: string;

  @Field()
  @Column()
  citizenIdentification: string;

  @Field()
  @Column()
  religion: string;

  @Field()
  @Column()
  targetGroup: string;

  @Field()
  @Column()
  region: string;

  @Field()
  @Column()
  priorityArea: string;

  @Field()
  @Column()
  partyMembershipStatus: string;

  @Field()
  @Column()
  joinDate: string;

  @Field()
  @Column()
  studentType: string;

  @Field()
  @Column()
  enrollmentStatus: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  district: string;

  @Field()
  @Column()
  country: string;

  @Field()
  @Column()
  permanentAddress: string;

  @Field()
  @Column()
  numberPhone: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  bankAccountNumber: string;

  @Field()
  @Column()
  bankName: string;

  @Field()
  @Column()
  registrations: string;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User)
  @JoinColumn({ name: "userId" })
  user?: User;

  @Column({ unique: true })
  userId: number;

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

  @Field(() => Class)
  @ManyToOne(() => Class)
  @JoinColumn({ name: "classId" })
  class: Class;

  @Column()
  classId: number;

  @Field(() => EducationalField)
  @ManyToOne(() => EducationalField)
  @JoinColumn({ name: "educationalFieldId" })
  educationalField: EducationalField;

  @Column()
  educationalFieldId: string;

  @Field(() => [EducationalProgram])
  @ManyToMany(() => EducationalProgram, { eager: true })
  @JoinTable({ name: "student-to-educational-program" })
  educationalPrograms: EducationalProgram[];
}

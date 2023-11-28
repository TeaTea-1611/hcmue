import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Course } from "./course";
import { EducationalField } from "./educational-field";

@ObjectType()
@Entity({ name: "educational-programs" })
export class EducationalProgram {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => EducationalField)
  @ManyToOne(() => EducationalField)
  @JoinColumn({ name: "educationalFieldId" })
  educationalField: EducationalField;

  @Column()
  educationalFieldId: string;

  @Field(() => Course)
  @ManyToOne(() => Course)
  @JoinColumn({ name: "courseId" })
  course: Course;

  @Column()
  courseId: number;
}

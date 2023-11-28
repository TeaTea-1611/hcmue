import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { EducationalSystem } from "./educational-system";
import { Faculty } from "./faculty";

@ObjectType()
@Entity({ name: "educational-fields" })
export class EducationalField {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => EducationalSystem)
  @ManyToOne(() => EducationalSystem)
  @JoinColumn({ name: "educationalSystemId" })
  educationalSystem: EducationalSystem;

  @Column()
  educationalSystemId: number;

  @Field(() => Faculty)
  @ManyToOne(() => Faculty)
  @JoinColumn({ name: "facultyId" })
  faculty: Faculty;

  @Column()
  facultyId: number;
}

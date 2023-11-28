import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Faculty } from "./faculty";
import { User } from "./user";

@ObjectType()
@Entity({ name: "lecturers" })
export class Lecturer {
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

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ unique: true })
  userId: number;

  @Field(() => Faculty)
  @ManyToOne(() => Faculty)
  @JoinColumn({ name: "facultyId" })
  faculty: Faculty;

  @Column()
  facultyId: number;
}

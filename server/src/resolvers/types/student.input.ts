import { Field, InputType, Int } from "type-graphql";

@InputType()
class CreateStudentInput {
  @Field()
  id: string;

  @Field()
  fullName: string;

  @Field()
  dob: string;

  @Field()
  pob: string;

  @Field()
  gender: string;

  @Field()
  position: string;

  @Field()
  ethnicity: string;

  @Field()
  citizenIdentification: string;

  @Field()
  religion: string;

  @Field()
  targetGroup: string;

  @Field()
  region: string;

  @Field()
  priorityArea: string;

  @Field()
  partyMembershipStatus: string;

  @Field()
  joinDate: string;

  @Field()
  studentType: string;

  @Field()
  enrollmentStatus: string;

  @Field()
  city: string;

  @Field()
  district: string;

  @Field()
  country: string;

  @Field()
  permanentAddress: string;

  @Field()
  numberPhone: string;

  @Field()
  email: string;

  @Field()
  address: string;

  @Field()
  bankAccountNumber: string;

  @Field()
  bankName: string;

  @Field()
  registrations: string;

  @Field(() => Int)
  facultyId: number;

  @Field(() => Int)
  courseId: number;

  @Field(() => Int)
  classId: number;

  @Field()
  educationalFieldId: string;

  @Field(() => [String])
  educationalProgramIds: string[];
}

@InputType()
export class CreateStudentAndAccountInput extends CreateStudentInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class UpdateStudentInput extends CreateStudentInput {}

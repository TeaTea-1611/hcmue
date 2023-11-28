import { Field, InputType, Int, registerEnumType } from "type-graphql";

@InputType()
class CreateLecturerInput {
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

  @Field(() => Int)
  facultyId: number;
}

@InputType()
export class CreateLecturerAndAccountInput extends CreateLecturerInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class UpdateLecturerInput extends CreateLecturerInput {}

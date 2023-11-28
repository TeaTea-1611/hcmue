import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateFacultyInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  address: string;

  @Field()
  numberPhone: string;
}

@InputType()
export class UpdateFacultyInput extends CreateFacultyInput {
  @Field(() => Int)
  id: number;
}

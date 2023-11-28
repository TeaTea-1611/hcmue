import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateEducationalFieldInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  educationalSystemId: number;

  @Field(() => Int)
  facultyId: number;
}

@InputType()
export class UpdateEducationalFieldInput extends CreateEducationalFieldInput {}

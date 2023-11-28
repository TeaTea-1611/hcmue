import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateEducationalSystemInput {
  @Field()
  name: string;

  @Field()
  type: string;
}

@InputType()
export class UpdateEducationalSystemInput extends CreateEducationalSystemInput {
  @Field(() => Int)
  id: number;
}

import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateEducationalProgramInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  educationalFieldId: string;

  @Field(() => Int)
  courseId: number;
}

@InputType()
export class UpdateEducationalProgramInput extends CreateEducationalProgramInput {}

import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateCourseInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateCourseInput extends CreateCourseInput {
  @Field(() => Int)
  id: number;
}

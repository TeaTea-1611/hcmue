import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateClassInput {
  @Field()
  name: string;

  @Field(() => Int)
  facultyId: number;

  @Field(() => Int)
  courseId: number;

  @Field()
  academicAdvisorId: string;
}

@InputType()
export class UpdateClassInput extends CreateClassInput {
  @Field(() => Int)
  id: number;
}

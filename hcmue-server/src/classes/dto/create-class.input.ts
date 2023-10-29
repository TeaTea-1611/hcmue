import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateClassInput {
  @Field()
  name: string;

  @Field(() => ID)
  facultyId: number;

  @Field(() => ID)
  courseId: number;
}

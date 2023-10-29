import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTrainingProgramInput {
  @Field()
  name: string;

  @Field(() => [ID])
  courseIds: number[];
}

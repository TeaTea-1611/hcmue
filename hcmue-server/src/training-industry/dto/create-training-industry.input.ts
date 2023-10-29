import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTrainingIndustryInput {
  @Field()
  name: string;

  @Field(() => ID)
  trainingSystemId: number;

  @Field(() => [ID])
  trainingProgramIds: number[];

  @Field(() => ID)
  trainingTypeId: number;

  @Field(() => [ID])
  courseIds: number[];
}

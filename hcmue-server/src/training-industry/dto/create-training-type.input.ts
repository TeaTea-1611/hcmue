import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTrainingTypeInput {
  @Field()
  name: string;
}

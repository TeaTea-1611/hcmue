import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTrainingSystemInput {
  @Field()
  name: string;
}

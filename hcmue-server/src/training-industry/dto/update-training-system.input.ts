import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateTrainingSystemInput } from './create-training-system.input';

@InputType()
export class UpdateTrainingSystemInput extends PartialType(
  CreateTrainingSystemInput,
) {
  @Field(() => ID)
  id: number;
}

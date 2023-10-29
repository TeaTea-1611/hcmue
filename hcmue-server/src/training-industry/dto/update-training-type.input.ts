import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateTrainingTypeInput } from './create-training-type.input';

@InputType()
export class UpdateTrainingTypeInput extends PartialType(
  CreateTrainingTypeInput,
) {
  @Field(() => ID)
  id: number;
}

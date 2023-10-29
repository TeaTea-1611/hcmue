import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateTrainingProgramInput } from './create-training-program.input';

@InputType()
export class UpdateTrainingProgramInput extends PartialType(
  CreateTrainingProgramInput,
) {
  @Field(() => ID)
  id: number;
}

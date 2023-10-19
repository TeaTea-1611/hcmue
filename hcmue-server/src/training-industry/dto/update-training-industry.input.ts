import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateTrainingIndustryInput } from './create-training-industry.input';

@InputType()
export class UpdateTrainingIndustryInput extends PartialType(
  CreateTrainingIndustryInput,
) {
  @Field(() => ID)
  id: number;
}

import { Field, ObjectType } from '@nestjs/graphql';
import { MutationResponse } from '../../types/mutation-response';
import { TrainingIndustry } from '../entities/training-industry.entity';
import { FieldError } from '../../types/field-error';

@ObjectType({ implements: MutationResponse })
export class TrainingIndustryMutationResponse implements MutationResponse {
  success: boolean;
  message?: string;

  @Field(() => TrainingIndustry, { nullable: true })
  trainingIndustry?: TrainingIndustry;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

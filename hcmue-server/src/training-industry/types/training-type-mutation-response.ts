import { Field, ObjectType } from '@nestjs/graphql';
import { MutationResponse } from '../../types/mutation-response';
import { TrainingType } from '../entities/training-type.entity';

@ObjectType({ implements: MutationResponse })
export class TrainingTypeMutationResponse implements MutationResponse {
  success: boolean;
  message?: string;

  @Field(() => TrainingType, { nullable: true })
  trainingType?: TrainingType;
}

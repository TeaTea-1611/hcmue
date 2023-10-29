import { Field, ObjectType } from '@nestjs/graphql';
import { MutationResponse } from '../../types/mutation-response';
import { TrainingSystem } from '../entities/training-system.entity';

@ObjectType({ implements: MutationResponse })
export class TrainingSystemMutationResponse implements MutationResponse {
  success: boolean;
  message?: string;

  @Field(() => TrainingSystem, { nullable: true })
  trainingSystem?: TrainingSystem;
}

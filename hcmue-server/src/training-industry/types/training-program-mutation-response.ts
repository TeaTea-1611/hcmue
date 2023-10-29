import { Field, ObjectType } from '@nestjs/graphql';
import { MutationResponse } from '../../types/mutation-response';
import { TrainingProgram } from '../entities/training-program.entity';
import { FieldError } from '../../types/field-error';

@ObjectType({ implements: MutationResponse })
export class TrainingProgramMutationResponse implements MutationResponse {
  success: boolean;
  message?: string;

  @Field(() => TrainingProgram, { nullable: true })
  trainingProgram?: TrainingProgram;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

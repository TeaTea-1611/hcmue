import { ObjectType, Field } from '@nestjs/graphql';
import { MutationResponse } from '../../types/mutation-response';
import { TrainingIndustry } from '../entities/training-industry.entity';
import { TrainingSystem } from '../entities/training-system.entity';
import { TrainingType } from '../entities/training-type.entity';
import { TrainingProgram } from '../entities/training-program.entity';

@ObjectType({ implements: MutationResponse })
export class TrainingIndustryMutationResponse implements MutationResponse {
  success: boolean;
  message?: string;

  @Field(() => TrainingIndustry, { nullable: true })
  trainingIndustry?: TrainingIndustry;
}

@ObjectType({ implements: MutationResponse })
export class TrainingSystemMutationResponse implements MutationResponse {
  success: boolean;
  message?: string;

  @Field(() => TrainingSystem, { nullable: true })
  trainingSystem?: TrainingSystem;
}

@ObjectType({ implements: MutationResponse })
export class TrainingTypeMutationResponse implements MutationResponse {
  success: boolean;
  message?: string;

  @Field(() => TrainingType, { nullable: true })
  trainingType?: TrainingType;
}

@ObjectType({ implements: MutationResponse })
export class TrainingProgramMutationResponse implements MutationResponse {
  success: boolean;
  message?: string;

  @Field(() => TrainingProgram, { nullable: true })
  trainingProgram?: TrainingProgram;
}

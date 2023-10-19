import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { TrainingIndustry } from './entities/training-industry.entity';
import {
  TrainingIndustryService,
  TrainingProgramService,
  TrainingSystemService,
  TrainingTypeService,
} from './training-industry.service';
import {
  CreateTrainingIndustryInput,
  CreateTrainingSystemInput,
} from './dto/create-training-industry.input';
import { TrainingSystem } from './entities/training-system.entity';
import { TrainingType } from './entities/training-type.entity';
import { TrainingProgram } from './entities/training-program.entity';

@Resolver(() => TrainingIndustry)
export class TrainingIndustryResolver {
  constructor(
    private readonly trainingIndustryService: TrainingIndustryService,
  ) {}

  @Mutation(() => TrainingIndustry)
  createTrainingIndustry(
    @Args('createTrainingIndustryInput')
    createTrainingIndustryInput: CreateTrainingIndustryInput,
  ) {
    return this.trainingIndustryService.create(createTrainingIndustryInput);
  }
}

@Resolver(() => TrainingSystem)
export class TrainingSystemResolver {
  constructor(private readonly trainingSystemService: TrainingSystemService) {}
}

@Resolver(() => TrainingType)
export class TrainingTypeResolver {
  constructor(private readonly trainingTypeService: TrainingTypeService) {}
}

@Resolver(() => TrainingProgram)
export class TrainingProgramResolver {
  constructor(
    private readonly trainingProgramService: TrainingProgramService,
  ) {}
}

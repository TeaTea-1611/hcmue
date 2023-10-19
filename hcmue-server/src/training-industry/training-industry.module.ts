import { Module } from '@nestjs/common';
import {
  TrainingIndustryResolver,
  TrainingSystemResolver,
  TrainingProgramResolver,
  TrainingTypeResolver,
} from './training-industry.resolver';
import {
  TrainingIndustryService,
  TrainingProgramService,
  TrainingSystemService,
  TrainingTypeService,
} from './training-industry.service';

@Module({
  providers: [
    TrainingIndustryResolver,
    TrainingSystemResolver,
    TrainingProgramResolver,
    TrainingTypeResolver,
    TrainingIndustryService,
    TrainingSystemService,
    TrainingProgramService,
    TrainingTypeService,
  ],
})
export class TrainingIndustryModule {}

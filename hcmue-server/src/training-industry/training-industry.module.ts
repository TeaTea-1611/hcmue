import { Module } from '@nestjs/common';
import { TrainingIndustryResolver } from './training-industry.resolver';
import { TrainingSystemResolver } from './training-system.resolver';
import { TrainingProgramResolver } from './training-program.resolver';
import { TrainingTypeResolver } from './training-type.resolver';

@Module({
  providers: [
    TrainingIndustryResolver,
    TrainingSystemResolver,
    TrainingProgramResolver,
    TrainingTypeResolver,
  ],
})
export class TrainingIndustryModule {}

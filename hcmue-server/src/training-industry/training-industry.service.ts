import { Injectable } from '@nestjs/common';
import { CreateTrainingIndustryInput } from './dto/create-training-industry.input';

@Injectable()
export class TrainingIndustryService {
  async create(createTrainingIndustryInput: CreateTrainingIndustryInput) {
    return 'This action adds a new trainingIndustry';
  }
}

@Injectable()
export class TrainingSystemService {}

@Injectable()
export class TrainingTypeService {}

@Injectable()
export class TrainingProgramService {}

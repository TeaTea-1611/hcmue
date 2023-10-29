import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { TrainingIndustry } from './entities/training-industry.entity';
import { CreateTrainingIndustryInput } from './dto/create-training-industry.input';
import { TrainingIndustryMutationResponse } from './types/training-industry-mutation-response';
import { TrainingSystem } from './entities/training-system.entity';
import { TrainingType } from './entities/training-type.entity';
import { TrainingProgram } from './entities/training-program.entity';
import { FieldError } from '../types/field-error';
import { Course } from '../courses/entities/course.entity';
import { In } from 'typeorm';

@Resolver(() => TrainingIndustry)
export class TrainingIndustryResolver {
  @Mutation(() => TrainingIndustryMutationResponse)
  async createTrainingIndustry(
    @Args('createTrainingIndustryInput')
    input: CreateTrainingIndustryInput,
  ): Promise<TrainingIndustryMutationResponse> {
    const errors: FieldError[] = [];
    try {
      const trainingSystem = await TrainingSystem.findOneBy({
        id: input.trainingSystemId,
      });
      if (!trainingSystem)
        errors.push({
          field: 'trainingSystem',
          message: 'The training system not found.',
        });
      const trainingType = await TrainingType.findOneBy({
        id: input.trainingTypeId,
      });

      if (!trainingType)
        errors.push({
          field: 'trainingType',
          message: 'The training type not found.',
        });

      const trainingPrograms = await TrainingProgram.find({
        where: {
          id: In(input.trainingProgramIds),
        },
      });

      if (!trainingPrograms.length)
        errors.push({
          field: 'trainingPrograms',
          message: 'The training program not found.',
        });

      const courses = await Course.find({ where: { id: In(input.courseIds) } });
      if (!courses.length)
        errors.push({
          field: 'courses',
          message: 'The course not found.',
        });
      if (errors.length)
        return {
          success: false,
          errors,
        };

      const trainingIndustry = TrainingIndustry.create({
        name: input.name,
        trainingSystem,
        trainingPrograms,
        trainingType,
        courses,
      });

      await trainingIndustry.save();
      return {
        success: true,
        message: 'The training industry has been created successfully.',
        trainingIndustry,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

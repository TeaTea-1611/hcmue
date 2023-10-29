import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TrainingProgram } from './entities/training-program.entity';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRoleEnumType } from '../users/types/user';
import { UseGuards } from '@nestjs/common';
import { CreateTrainingProgramInput } from './dto/create-training-program.input';
import { TrainingProgramMutationResponse } from './types/training-program-mutation-response';
import { UpdateTrainingProgramInput } from './dto/update-training-program.input';
import { Course } from '../courses/entities/course.entity';
import { In } from 'typeorm';
import { FieldError } from '../types/field-error';

@Resolver(() => TrainingProgram)
export class TrainingProgramResolver {
  @Mutation(() => TrainingProgramMutationResponse)
  @Roles(UserRoleEnumType.Admin)
  @UseGuards(RolesGuard)
  async createTrainingProgram(
    @Args('createTrainingProgramInput')
    input: CreateTrainingProgramInput,
  ): Promise<TrainingProgramMutationResponse> {
    const errors: FieldError[] = [];

    try {
      const existing = await TrainingProgram.findOneBy({ name: input.name });
      if (existing) throw new Error('The training program already exists.');

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

      const trainingProgram = TrainingProgram.create({
        name: input.name,
        courses,
      });
      await trainingProgram.save();

      return {
        success: true,
        message: 'The training program has been created successfully.',
        trainingProgram,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Mutation(() => TrainingProgramMutationResponse)
  @Roles(UserRoleEnumType.Admin)
  @UseGuards(RolesGuard)
  async updateTrainingProgram(
    @Args('updateTrainingProgramInput')
    input: UpdateTrainingProgramInput,
  ): Promise<TrainingProgramMutationResponse> {
    const errors: FieldError[] = [];

    try {
      const trainingProgram = await TrainingProgram.findOneBy({ id: input.id });

      if (!trainingProgram) throw new Error('The training program not found.');

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

      trainingProgram.name = input.name;
      trainingProgram.courses = courses;

      await trainingProgram.save();

      return {
        success: true,
        message: 'The training program has been removed successfully.',
        trainingProgram,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Mutation(() => TrainingProgramMutationResponse)
  @Roles(UserRoleEnumType.Admin)
  @UseGuards(RolesGuard)
  async removeTrainingProgram(
    @Args('id', { type: () => ID })
    id: number,
  ): Promise<TrainingProgramMutationResponse> {
    try {
      const trainingProgram = await TrainingProgram.findOneBy({ id });

      if (!trainingProgram) throw new Error('The training program not found.');

      await trainingProgram.remove();

      return {
        success: true,
        message: 'The training program has been removed successfully.',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Query(() => [TrainingProgram], { nullable: true })
  async trainingPrograms(): Promise<TrainingProgram[]> {
    return await TrainingProgram.find();
  }
}

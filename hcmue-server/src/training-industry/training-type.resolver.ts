import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TrainingType } from './entities/training-type.entity';
import { CreateTrainingTypeInput } from './dto/create-training-type.input';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRoleEnumType } from '../users/types/user';
import { UseGuards } from '@nestjs/common';
import { TrainingTypeMutationResponse } from './types/training-type-mutation-response';
import { UpdateTrainingTypeInput } from './dto/update-training-type.input';

@Resolver(() => TrainingType)
export class TrainingTypeResolver {
  @Mutation(() => TrainingTypeMutationResponse)
  @Roles(UserRoleEnumType.Admin)
  @UseGuards(RolesGuard)
  async createTrainingType(
    @Args('createTrainingTypeInput')
    input: CreateTrainingTypeInput,
  ): Promise<TrainingTypeMutationResponse> {
    try {
      const existing = await TrainingType.findOneBy({ name: input.name });
      if (existing) throw new Error('The training type already exists.');

      const trainingType = TrainingType.create({ ...input });
      await trainingType.save();

      return {
        success: true,
        message: 'The training type has been created successfully.',
        trainingType,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Mutation(() => TrainingTypeMutationResponse)
  @Roles(UserRoleEnumType.Admin)
  @UseGuards(RolesGuard)
  async updateTrainingType(
    @Args('updateTrainingTypeInput')
    input: UpdateTrainingTypeInput,
  ): Promise<TrainingTypeMutationResponse> {
    try {
      const trainingType = await TrainingType.findOneBy({ id: input.id });

      if (!trainingType) throw new Error('The training type not found.');

      trainingType.name = input.name;

      await trainingType.save();

      return {
        success: true,
        message: 'The training type has been removed successfully.',
        trainingType,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Mutation(() => TrainingTypeMutationResponse)
  @Roles(UserRoleEnumType.Admin)
  @UseGuards(RolesGuard)
  async removeTrainingType(
    @Args('id', { type: () => ID })
    id: number,
  ): Promise<TrainingTypeMutationResponse> {
    try {
      const trainingType = await TrainingType.findOneBy({ id });

      if (!trainingType) throw new Error('The training type not found.');

      await trainingType.remove();

      return {
        success: true,
        message: 'The training type has been removed successfully.',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Query(() => [TrainingType], { nullable: true })
  async trainingTypes(): Promise<TrainingType[]> {
    return await TrainingType.find();
  }
}

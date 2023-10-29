import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TrainingSystem } from './entities/training-system.entity';
import { TrainingSystemMutationResponse } from './types/training-system-mutation-response';
import { CreateTrainingSystemInput } from './dto/create-training-system.input';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRoleEnumType } from '../users/types/user';
import { UseGuards } from '@nestjs/common';
import { UpdateTrainingSystemInput } from './dto/update-training-system.input';

@Resolver(() => TrainingSystem)
export class TrainingSystemResolver {
  @Mutation(() => TrainingSystemMutationResponse)
  @Roles(UserRoleEnumType.Admin)
  @UseGuards(RolesGuard)
  async createTrainingSystem(
    @Args('createTrainingSystemInput')
    input: CreateTrainingSystemInput,
  ): Promise<TrainingSystemMutationResponse> {
    try {
      const existing = await TrainingSystem.findOneBy({ name: input.name });
      if (existing) throw new Error('The training system already exists.');

      const trainingSystem = TrainingSystem.create({ ...input });
      await trainingSystem.save();

      return {
        success: true,
        message: 'The training system has been created successfully.',
        trainingSystem,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Mutation(() => TrainingSystemMutationResponse)
  @Roles(UserRoleEnumType.Admin)
  @UseGuards(RolesGuard)
  async updateTrainingSystem(
    @Args('updateTrainingSystemInput')
    input: UpdateTrainingSystemInput,
  ): Promise<TrainingSystemMutationResponse> {
    try {
      const trainingSystem = await TrainingSystem.findOneBy({ id: input.id });

      if (!trainingSystem) throw new Error('The training system not found.');

      trainingSystem.name = input.name;

      await trainingSystem.save();

      return {
        success: true,
        message: 'The training system has been removed successfully.',
        trainingSystem,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Mutation(() => TrainingSystemMutationResponse)
  @Roles(UserRoleEnumType.Admin)
  @UseGuards(RolesGuard)
  async removeTrainingSystem(
    @Args('id', { type: () => ID })
    id: number,
  ): Promise<TrainingSystemMutationResponse> {
    try {
      const trainingSystem = await TrainingSystem.findOneBy({ id });

      if (!trainingSystem) throw new Error('The training system not found.');

      await trainingSystem.remove();

      return {
        success: true,
        message: 'The training system has been removed successfully.',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Query(() => [TrainingSystem], { nullable: true })
  async trainingSystems(): Promise<TrainingSystem[]> {
    return await TrainingSystem.find();
  }
}

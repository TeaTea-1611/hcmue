import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { CreateFacultyInput } from './dto/create-faculty.input';
import { Faculty } from './entities/faculty.entity';
import { FacultyMutationResponse } from './types/faculty-mutation-response';
import { FieldError } from '../types/field-error';
import { length } from '../utils/validate';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRoleEnumType } from '../users/types/user';
import { UseGuards } from '@nestjs/common';
@Resolver(() => Faculty)
export class FacultiesResolver {
  @Mutation(() => FacultyMutationResponse)
  async createFaculty(
    @Args('createFacultyInput')
    { name, address, email, numberPhone }: CreateFacultyInput,
  ): Promise<FacultyMutationResponse> {
    try {
      const existing = await Faculty.findOneBy({ name });
      if (existing) throw new Error('The Faculty already exists.');

      const errors: FieldError[] = [];
      const errorName = length('name', name, 2, 20);

      if (errorName) errors.push(errorName);

      if (errors.length)
        return {
          success: false,
          errors,
        };

      const faculty = Faculty.create({ name, address, email, numberPhone });

      await faculty.save();

      return {
        success: true,
        message: 'The Faculty has been created successfully.',
        faculty,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Mutation(() => FacultyMutationResponse)
  @Roles(UserRoleEnumType.Admin)
  @UseGuards(RolesGuard)
  async removeFaculty(
    @Args('id', { type: () => ID })
    id: number,
  ): Promise<FacultyMutationResponse> {
    try {
      const faculty = await Faculty.findOneBy({ id });

      if (!faculty) throw new Error('The faculty not found.');

      await faculty.remove();

      return {
        success: true,
        message: 'The faculty has been removed successfully.',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

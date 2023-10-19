import { ObjectType, Field } from '@nestjs/graphql';
import { Course } from '../entities/course.entity';
import { MutationResponse } from '../../types/mutation-response';

@ObjectType({ implements: MutationResponse })
export class CourseMutationResponse implements MutationResponse {
  success: boolean;
  message?: string;

  @Field(() => Course, { nullable: true })
  course?: Course;
}

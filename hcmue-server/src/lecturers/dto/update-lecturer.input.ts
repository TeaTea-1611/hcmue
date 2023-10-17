import { CreateLecturerInput } from './create-lecturer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLecturerInput extends PartialType(CreateLecturerInput) {
  @Field(() => Int)
  id: number;
}

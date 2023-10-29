import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFacultyInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  numberPhone?: string;

  @Field({ nullable: true })
  email?: string;
}

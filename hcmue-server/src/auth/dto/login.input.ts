import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { MinLength, MaxLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @MinLength(6, { message: 'Tối thiểu 6 ký tự' })
  @MaxLength(20, { message: 'Tối đa 20 ký tự' })
  username: string;

  @Field()
  @MinLength(6, { message: 'Tối thiểu 6 ký tự' })
  @MaxLength(50, { message: 'Tối đa 50 ký tự' })
  password: string;
}

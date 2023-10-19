import { Field, InterfaceType, ObjectType } from '@nestjs/graphql';

@InterfaceType()
export abstract class MutationResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field({ nullable: true })
  message?: string;
}

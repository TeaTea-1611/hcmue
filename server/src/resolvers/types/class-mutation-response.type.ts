import { Field, ObjectType } from "type-graphql";
import { Class } from "../../entities";
import { IMutationResponse } from "./mutation-response.type";
import { FieldError } from "./field-error.type";

@ObjectType({ implements: IMutationResponse })
export class ClassMutationResponse implements IMutationResponse {
  success: boolean;
  message?: string;

  @Field({ nullable: true })
  class?: Class;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

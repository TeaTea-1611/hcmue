import { Field, ObjectType } from "type-graphql";
import { Faculty } from "../../entities";
import { IMutationResponse } from "./mutation-response.type";
import { FieldError } from "./field-error.type";

@ObjectType({ implements: IMutationResponse })
export class FacultyMutationResponse implements IMutationResponse {
  success: boolean;
  message?: string;

  @Field({ nullable: true })
  faculty?: Faculty;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

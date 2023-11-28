import { Field, ObjectType } from "type-graphql";
import { EducationalSystem } from "../../entities";
import { IMutationResponse } from "./mutation-response.type";
import { FieldError } from "./field-error.type";

@ObjectType({ implements: IMutationResponse })
export class EducationalSystemMutationResponse implements IMutationResponse {
  success: boolean;
  message?: string;

  @Field({ nullable: true })
  educationalSystem?: EducationalSystem;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

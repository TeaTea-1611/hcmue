import { Field, ObjectType } from "type-graphql";
import { EducationalField } from "../../entities";
import { IMutationResponse } from "./mutation-response.type";
import { FieldError } from "./field-error.type";

@ObjectType({ implements: IMutationResponse })
export class EducationalFieldMutationResponse implements IMutationResponse {
  success: boolean;
  message?: string;

  @Field({ nullable: true })
  educationalField?: EducationalField;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

import { Field, ObjectType } from "type-graphql";
import { EducationalProgram } from "../../entities";
import { IMutationResponse } from "./mutation-response.type";
import { FieldError } from "./field-error.type";

@ObjectType({ implements: IMutationResponse })
export class EducationalProgramMutationResponse implements IMutationResponse {
  success: boolean;
  message?: string;

  @Field({ nullable: true })
  educationalProgram?: EducationalProgram;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

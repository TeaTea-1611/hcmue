import { Field, ObjectType } from "type-graphql";
import { Lecturer } from "../../entities";
import { IMutationResponse } from "./mutation-response.type";
import { FieldError } from "./field-error.type";

@ObjectType({ implements: IMutationResponse })
export class LecturerMutationResponse implements IMutationResponse {
  success: boolean;
  message?: string;

  @Field({ nullable: true })
  lecturer?: Lecturer;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

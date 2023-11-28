import { Field, ObjectType } from "type-graphql";
import { Course } from "../../entities";
import { IMutationResponse } from "./mutation-response.type";
import { FieldError } from "./field-error.type";

@ObjectType({ implements: IMutationResponse })
export class CourseMutationResponse implements IMutationResponse {
  success: boolean;
  message?: string;

  @Field({ nullable: true })
  course?: Course;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

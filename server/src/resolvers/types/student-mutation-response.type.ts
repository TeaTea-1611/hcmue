import { Field, Int, ObjectType } from "type-graphql";
import { Student } from "../../entities";
import { IMutationResponse } from "./mutation-response.type";
import { FieldError } from "./field-error.type";

@ObjectType({ implements: IMutationResponse })
export class StudentMutationResponse implements IMutationResponse {
  success: boolean;
  message?: string;

  @Field({ nullable: true })
  student?: Student;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class StudentPaginatedResponse {
  @Field(() => [Student])
  students: Student[];

  @Field(() => Int)
  totalCount: number;
}

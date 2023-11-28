import { Field, ObjectType } from "type-graphql";
import { User } from "../../entities/index.js";
import { IMutationResponse } from "./mutation-response.type.js";

@ObjectType({ implements: IMutationResponse })
export class LoginMutationResponse implements IMutationResponse {
  success: boolean;
  message?: string;

  @Field({ nullable: true })
  user?: User;
}

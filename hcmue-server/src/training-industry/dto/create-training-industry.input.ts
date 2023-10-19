import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
class Input {
  @Field()
  name: string;
}

@InputType()
export class CreateTrainingIndustryInput extends Input {}

@InputType()
export class CreateTrainingProgramInput extends Input {}

@InputType()
export class CreateTrainingTypeInput extends Input {}

@InputType()
export class CreateTrainingSystemInput extends Input {}

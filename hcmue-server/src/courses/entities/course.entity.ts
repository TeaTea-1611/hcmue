import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@ObjectType()
@Unique('course_unique', ['name', 'year'])
@Entity({ name: 'courses' })
export class Course extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 10 })
  name: string;

  @Field()
  @Column({ length: 4 })
  year: string;
}

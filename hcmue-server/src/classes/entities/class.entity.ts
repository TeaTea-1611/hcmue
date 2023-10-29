import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Faculty } from '../../faculties/entities/faculty.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

@ObjectType()
@Entity({ name: 'class' })
export class Class extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 20, unique: true })
  name: string;

  @Field(() => Faculty)
  @ManyToOne(() => Faculty)
  faculty: Faculty;

  @Field(() => Course)
  @ManyToOne(() => Course)
  course: Course;
}

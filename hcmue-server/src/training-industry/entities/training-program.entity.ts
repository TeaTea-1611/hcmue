import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Course } from '../../courses/entities/course.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'training_program' })
export class TrainingProgram extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => [Course])
  @ManyToMany(() => Course)
  @JoinTable({ name: 'training_program_to_course' })
  courses: Course[];
}

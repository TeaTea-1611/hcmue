import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrainingSystem } from './training-system.entity';
import { TrainingType } from './training-type.entity';
import { Faculty } from '../../faculties/entities/faculty.entity';
import { TrainingProgram } from './training-program.entity';
import { Course } from '../../courses/entities/course.entity';

@ObjectType()
@Entity({ name: 'training_industry' })
export class TrainingIndustry extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => TrainingSystem)
  @ManyToOne(() => TrainingSystem)
  trainingSystem: TrainingSystem;

  @Field(() => TrainingType)
  @ManyToOne(() => TrainingType)
  trainingType: TrainingType;

  @Field(() => Faculty)
  @ManyToOne(() => Faculty)
  managementFaculty: Faculty;

  @Field(() => [Course])
  @ManyToMany(() => Course)
  @JoinTable({ name: 'training_industry_course' })
  courses: Course[];

  @Field(() => TrainingProgram)
  @ManyToOne(() => TrainingProgram)
  trainingProgram: TrainingProgram;
}

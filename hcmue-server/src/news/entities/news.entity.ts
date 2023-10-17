import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { New_Types } from './new-types.entity';

@ObjectType()
@Entity({ name: 'news' })
export class News extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => New_Types)
  @ManyToOne(() => New_Types, (nt) => nt.news)
  type: New_Types;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
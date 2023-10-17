import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRoleEnumType } from '../types/user';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 20, unique: true })
  username: string;

  @Column()
  password: string;

  @Field()
  @Column({ enum: UserRoleEnumType })
  role: UserRoleEnumType;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}

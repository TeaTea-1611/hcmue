import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'faculty' })
export class Faculty extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 20, unique: true })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  @Column({ length: 15, nullable: true })
  numberPhone?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email?: string;
}

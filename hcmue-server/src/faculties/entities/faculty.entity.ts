import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'faculties' })
export class Faculty extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn({ length: 4 })
  id: string;

  @Field()
  @Column({ length: 20, unique: true })
  name: string;

  @Field()
  @Column({ nullable: true })
  address?: string;

  @Field()
  @Column({ length: 15, nullable: true })
  numberPhone?: string;

  @Field()
  @Column({ nullable: true })
  email?: string;
}

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'lecturer' })
export class Lecturer extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn({ length: 20 })
  id: string;

  @Field()
  @Column({ length: 100 })
  name: string;

  @Field()
  @Column({ length: 10 })
  dob?: string;

  @Field()
  @Column({ length: 50 })
  pob?: string;
}

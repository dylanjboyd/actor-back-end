import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Actor } from '../../actors/entities/actor.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  adult: boolean;

  @Column()
  @ApiProperty()
  budget: number;

  @Column()
  @ApiProperty({ required: false })
  tagline?: string;

  @ManyToMany(() => Actor, (actor) => actor.movies)
  @ApiProperty()
  actors: Actor[];
}

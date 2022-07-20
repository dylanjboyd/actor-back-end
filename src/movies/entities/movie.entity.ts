import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Actor } from '../../actors/entities/actor.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  adult: boolean;

  @Column()
  budget: number;

  @Column()
  tagline?: string;

  @ManyToMany(() => Actor, (actor) => actor.movies)
  actors: Actor[];
}

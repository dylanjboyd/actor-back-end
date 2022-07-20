import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';

export class Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: number; // 0 = unknown, 1 = female, 2 = male, 3 = non-binary

  @Column()
  popularity: number;

  @Column()
  placeOfBirth?: string;

  @ManyToMany(() => Movie, (movie) => movie.actors)
  @JoinTable()
  movies: Movie[];
}

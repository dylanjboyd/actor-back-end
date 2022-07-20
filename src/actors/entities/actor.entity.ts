import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Actor {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  gender: number; // 0 = unknown, 1 = female, 2 = male, 3 = non-binary

  @Column()
  @ApiProperty()
  popularity: number;

  @Column()
  @ApiProperty({ required: false })
  placeOfBirth?: string;

  @ManyToMany(() => Movie, (movie) => movie.actors)
  @JoinTable()
  @ApiProperty()
  movies: Movie[];
}

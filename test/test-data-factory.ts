import { CreateMovieDto } from '../src/movies/dto/create-movie.dto';
import { CreateActorDto } from '../src/actors/dto/create-actor.dto';
import { Movie } from '../src/movies/entities/movie.entity';
import { Actor } from '../src/actors/entities/actor.entity';

export const generateCreateMovieDto = (): CreateMovieDto => ({
  title: 'Fight Club',
  adult: false,
  budget: 63000000,
  tagline:
    "How much can you know about yourself if you've never been in a fight?",
});

export const generateMovieEntity = (): Movie => ({
  id: 1,
  actors: [],
  ...generateCreateMovieDto(),
});

export const generateCreateActorDto = (): CreateActorDto => ({
  name: 'Brad Pitt',
  gender: 2,
  placeOfBirth: 'Shawnee, Oklahoma, USA',
  popularity: 10.647,
});

export const generateActorEntity = (): Actor => ({
  id: 1,
  movies: [],
  ...generateCreateActorDto(),
});

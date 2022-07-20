import { Module } from '@nestjs/common';
import { ActorsModule } from './actors/actors.module';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './actors/entities/actor.entity';
import { Movie } from './movies/entities/movie.entity';

const typeOrmImport = TypeOrmModule.forRoot({
  type: 'better-sqlite3',
  database: ':memory:',
  dropSchema: true,
  entities: [Actor, Movie],
  synchronize: true,
});

@Module({
  imports: [ActorsModule, MoviesModule, typeOrmImport],
})
export class AppModule {}

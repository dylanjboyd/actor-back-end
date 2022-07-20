import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActorsModule } from './actors/actors.module';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './actors/entities/actor.entity';
import { Movie } from './movies/entities/movie.entity';

const typeOrmImport = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [Actor, Movie],
  synchronize: true,
});

@Module({
  imports: [ActorsModule, MoviesModule, typeOrmImport],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActorsModule } from './actors/actors.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [ActorsModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

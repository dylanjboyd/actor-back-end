import { Module } from '@nestjs/common';
import { ActorsModule } from './actors/actors.module';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';

const typeOrmImport = TypeOrmModule.forRoot({
  type: 'better-sqlite3',
  database: ':memory:',
  dropSchema: true,
  synchronize: true,
  autoLoadEntities: true,
});

@Module({
  imports: [ActorsModule, MoviesModule, typeOrmImport],
})
export class AppModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  generateCreateActorDto,
  generateCreateMovieDto,
} from './test-data-factory';

describe('MoviesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/movies (GET)', async () => {
    await request(app.getHttpServer()).get('/movies').expect(200).expect([]);
  });

  it('/movies (POST)', async () => {
    const expectedMovie = {
      ...generateCreateMovieDto(),
      id: 1,
    };

    await request(app.getHttpServer())
      .post('/movies')
      .send(generateCreateMovieDto())
      .expect(201)
      .expect(expectedMovie);

    await request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([expectedMovie]);
  });

  it('/movies (DELETE)', async () => {
    const expectedActor = {
      ...generateCreateMovieDto(),
      id: 1,
    };
    await request(app.getHttpServer())
      .post('/movies')
      .send(generateCreateMovieDto())
      .expect(201)
      .expect(expectedActor);

    await request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200)
      .expect({});

    await request(app.getHttpServer()).get('/movies').expect(200).expect([]);
  });
});

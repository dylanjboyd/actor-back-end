import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { generateCreateMovieDto } from './test-data-factory';

/*
NOTE: The use of mixed endpoint calls in the below tests, though violating
the single responsibility principle, is deemed acceptable for the simplicity of
this challenge.
 */

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
      .delete('/movies/1')
      .expect(200)
      .expect({});

    await request(app.getHttpServer()).get('/movies').expect(200).expect([]);
  });

  it('/movies (PATCH)', async () => {
    const expectedMovie = {
      ...generateCreateMovieDto(),
      id: 1,
    };
    const modifiedMovieDto = {
      ...generateCreateMovieDto(),
      title: 'Test movie',
    };

    await request(app.getHttpServer())
      .post('/movies')
      .send(generateCreateMovieDto())
      .expect(201)
      .expect(expectedMovie);

    await request(app.getHttpServer())
      .patch('/movies/1')
      .send(modifiedMovieDto)
      .expect(200)
      .expect({});

    await request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([{ ...modifiedMovieDto, id: 1 }]);
  });
});

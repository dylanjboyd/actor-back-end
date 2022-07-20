import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { generateCreateActorDto } from './test-data-factory';

/*
NOTE: The use of mixed endpoint calls in the below tests, though violating
the single responsibility principle, is deemed acceptable for the simplicity of
this challenge.
 */

describe('ActorsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/actors (GET)', async () => {
    await request(app.getHttpServer()).get('/actors').expect(200).expect([]);
  });

  it('/actors (POST)', async () => {
    const expectedActor = {
      ...generateCreateActorDto(),
      id: 1,
    };
    await request(app.getHttpServer())
      .post('/actors')
      .send(generateCreateActorDto())
      .expect(201)
      .expect(expectedActor);

    await request(app.getHttpServer())
      .get('/actors')
      .expect(200)
      .expect([expectedActor]);
  });

  it('/actors (DELETE)', async () => {
    const expectedActor = {
      ...generateCreateActorDto(),
      id: 1,
    };
    await request(app.getHttpServer())
      .post('/actors')
      .send(generateCreateActorDto())
      .expect(201)
      .expect(expectedActor);

    await request(app.getHttpServer())
      .delete('/actors/1')
      .expect(200)
      .expect({});

    await request(app.getHttpServer()).get('/actors').expect(200).expect([]);
  });

  it('/actors (PATCH)', async () => {
    const expectedActor = {
      ...generateCreateActorDto(),
      id: 1,
    };
    const modifiedActorDto = {
      ...generateCreateActorDto(),
      name: 'Test actor',
    };

    await request(app.getHttpServer())
      .post('/actors')
      .send(generateCreateActorDto())
      .expect(201)
      .expect(expectedActor);

    await request(app.getHttpServer())
      .patch('/actors/1')
      .send(modifiedActorDto)
      .expect(200)
      .expect({});

    await request(app.getHttpServer())
      .get('/actors')
      .expect(200)
      .expect([{ ...modifiedActorDto, id: 1 }]);
  });
});

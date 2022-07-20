import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { generateCreateActorDto } from './test-data-factory';

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
});

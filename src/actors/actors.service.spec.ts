import { Test, TestingModule } from '@nestjs/testing';
import { ActorsService } from './actors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';
import {
  generateCreateActorDto,
  generateActorEntity,
} from '../../test/test-data-factory';
import { Repository } from 'typeorm';

describe('ActorsService', () => {
  let service: ActorsService;
  let actorRepositoryMock: Partial<Repository<Actor>>;

  beforeEach(async () => {
    actorRepositoryMock = {
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActorsService,
        {
          provide: getRepositoryToken(Actor),
          useValue: actorRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ActorsService>(ActorsService);
  });

  it('should create an actor', () => {
    // Arrange
    const actorDto = generateCreateActorDto();

    // Act
    service.create(actorDto);

    // Assert
    expect(actorRepositoryMock.save).toBeCalledWith(actorDto);
  });

  it('should find all actors', () => {
    // Arrange
    const actorEntity = generateActorEntity();
    actorRepositoryMock.find = jest.fn().mockReturnValue([actorEntity]);

    // Act
    const results = service.findAll();

    // Assert
    expect(results).toEqual([actorEntity]);
  });

  it('should find one actor', () => {
    // Arrange
    const actorEntity = generateActorEntity();
    actorRepositoryMock.findOneBy = jest.fn().mockReturnValue(actorEntity);

    // Act
    const results = service.findOne(actorEntity.id);

    // Assert
    expect(results).toEqual(actorEntity);
  });

  it('should update a actor', () => {
    // Arrange
    const actorDto = generateCreateActorDto();
    actorRepositoryMock.update = jest.fn();

    // Act
    service.update(1, actorDto);

    // Assert
    expect(actorRepositoryMock.update).toBeCalledWith({ id: 1 }, actorDto);
  });

  it('should remove an actor', () => {
    // Arrange
    actorRepositoryMock.delete = jest.fn();

    // Act
    service.remove(1);

    // Assert
    expect(actorRepositoryMock.delete).toBeCalledWith(1);
  });
});

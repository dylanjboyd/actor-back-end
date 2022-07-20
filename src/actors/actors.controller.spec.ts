import { Test, TestingModule } from '@nestjs/testing';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import {
  generateCreateActorDto,
  generateActorEntity,
} from '../../test/test-data-factory';

describe('ActorsController', () => {
  let controller: ActorsController;
  let mockActorsService: Partial<ActorsService>;

  beforeEach(async () => {
    mockActorsService = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActorsController],
      providers: [ActorsService],
    })
      .overrideProvider(ActorsService)
      .useValue(mockActorsService)
      .compile();

    controller = module.get<ActorsController>(ActorsController);
  });

  it('should create an actor', () => {
    // Arrange
    const actorDto = generateCreateActorDto();
    mockActorsService.create = jest.fn().mockReturnValue(actorDto);

    // Act
    const result = controller.create(actorDto);

    // Assert
    expect(result).toEqual(actorDto);
    expect(mockActorsService.create).toBeCalledWith(actorDto);
  });

  it('should find all actors', () => {
    // Arrange
    const actorEntity = generateActorEntity();
    mockActorsService.findAll = jest.fn().mockReturnValue([actorEntity]);

    // Act
    const result = controller.findAll();

    // Assert
    expect(result).toEqual([actorEntity]);
  });

  it('should find one actor', () => {
    // Arrange
    const actorEntity = generateActorEntity();
    mockActorsService.findOne = jest.fn().mockReturnValue(actorEntity);

    // Act
    const result = controller.findOne('1');

    // Assert
    expect(result).toEqual(actorEntity);
    expect(mockActorsService.findOne).toBeCalledWith(1);
  });

  it('should update an actor', () => {
    // Arrange
    const actorDto = generateCreateActorDto();
    mockActorsService.update = jest.fn().mockReturnValue(actorDto);

    // Act
    const result = controller.update('1', actorDto);

    // Assert
    expect(result).toEqual(actorDto);
    expect(mockActorsService.update).toBeCalledWith(1, actorDto);
  });

  it('should remove an actor', () => {
    // Arrange
    mockActorsService.remove = jest.fn();

    // Act
    controller.remove('1');

    // Assert
    expect(mockActorsService.remove).toBeCalledWith(1);
  });
});

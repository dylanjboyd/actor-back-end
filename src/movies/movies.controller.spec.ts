import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import {
  generateCreateMovieDto,
  generateMovieEntity,
} from '../../test/test-data-factory';

describe('MoviesController', () => {
  let controller: MoviesController;
  let mockMoviesService: Partial<MoviesService>;

  beforeEach(async () => {
    mockMoviesService = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    })
      .overrideProvider(MoviesService)
      .useValue(mockMoviesService)
      .compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should create a movie', () => {
    // Arrange
    const movieDto = generateCreateMovieDto();
    mockMoviesService.create = jest.fn().mockReturnValue(movieDto);

    // Act
    const result = controller.create(movieDto);

    // Assert
    expect(result).toEqual(movieDto);
    expect(mockMoviesService.create).toBeCalledWith(movieDto);
  });

  it('should find all movies', () => {
    // Arrange
    const movieEntity = generateMovieEntity();
    mockMoviesService.findAll = jest.fn().mockReturnValue([movieEntity]);

    // Act
    const result = controller.findAll();

    // Assert
    expect(result).toEqual([movieEntity]);
  });

  it('should find one movie', () => {
    // Arrange
    const movieEntity = generateMovieEntity();
    mockMoviesService.findOne = jest.fn().mockReturnValue(movieEntity);

    // Act
    const result = controller.findOne('1');

    // Assert
    expect(result).toEqual(movieEntity);
    expect(mockMoviesService.findOne).toBeCalledWith(1);
  });

  it('should update a movie', () => {
    // Arrange
    const movieDto = generateCreateMovieDto();
    mockMoviesService.update = jest.fn().mockReturnValue(movieDto);

    // Act
    const result = controller.update('1', movieDto);

    // Assert
    expect(result).toEqual(movieDto);
    expect(mockMoviesService.update).toBeCalledWith(1, movieDto);
  });

  it('should remove a movie', () => {
    // Arrange
    mockMoviesService.remove = jest.fn();

    // Act
    controller.remove('1');

    // Assert
    expect(mockMoviesService.remove).toBeCalledWith(1);
  });
});

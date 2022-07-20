import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import {
  generateCreateMovieDto,
  generateMovieEntity,
} from '../../test/test-data-factory';
import { Repository } from 'typeorm';

describe('MoviesService', () => {
  let service: MoviesService;
  let movieRepositoryMock: Partial<Repository<Movie>>;

  beforeEach(async () => {
    movieRepositoryMock = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: movieRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should create a movie', () => {
    // Arrange
    const movieDto = generateCreateMovieDto();

    // Act
    service.create(movieDto);

    // Assert
    expect(movieRepositoryMock.create).toBeCalledWith(movieDto);
  });

  it('should find all movies', () => {
    // Arrange
    const movieEntity = generateMovieEntity();
    movieRepositoryMock.find = jest.fn().mockReturnValue([movieEntity]);

    // Act
    const results = service.findAll();

    // Assert
    expect(results).toEqual([movieEntity]);
  });

  it('should find one movie', () => {
    // Arrange
    const movieEntity = generateMovieEntity();
    movieRepositoryMock.findOneBy = jest.fn().mockReturnValue(movieEntity);

    // Act
    const results = service.findOne(movieEntity.id);

    // Assert
    expect(results).toEqual(movieEntity);
  });

  it('should update a movie', () => {
    // Arrange
    const movieDto = generateCreateMovieDto();
    movieRepositoryMock.update = jest.fn();

    // Act
    service.update(1, movieDto);

    // Assert
    expect(movieRepositoryMock.update).toBeCalledWith({ id: 1 }, movieDto);
  });

  it('should remove a movie', () => {
    // Arrange
    movieRepositoryMock.delete = jest.fn();

    // Act
    service.remove(1);

    // Assert
    expect(movieRepositoryMock.delete).toBeCalledWith(1);
  });
});

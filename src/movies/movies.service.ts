import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}
  create(createMovieDto: CreateMovieDto) {
    return this.moviesRepository.create(createMovieDto);
  }

  findAll() {
    return this.moviesRepository.find();
  }

  findOne(id: number) {
    return this.moviesRepository.findOneBy({ id });
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return this.moviesRepository.update({ id }, updateMovieDto);
  }

  remove(id: number) {
    return this.moviesRepository.delete(id);
  }
}

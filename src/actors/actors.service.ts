import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { Actor } from './entities/actor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private actorsRepository: Repository<Actor>,
  ) {}
  create(createActorDto: CreateActorDto) {
    return this.actorsRepository.create(createActorDto);
  }

  findAll() {
    return this.actorsRepository.find();
  }

  findOne(id: number) {
    return this.actorsRepository.findOneBy({ id });
  }

  update(id: number, updateActorDto: UpdateActorDto) {
    return this.actorsRepository.update({ id }, updateActorDto);
  }

  remove(id: number) {
    return this.actorsRepository.delete(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Actor } from './entities/actor.entity';

@ApiTags('actors')
@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Successfully created an Actor.',
    type: Actor,
  })
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorsService.create(createActorDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Successfully retrieved list of all Actors.',
    type: Actor,
    isArray: true,
  })
  findAll() {
    return this.actorsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Successfully retrieved a single Actor.',
    type: Actor,
  })
  findOne(@Param('id') id: string) {
    return this.actorsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateActorDto: UpdateActorDto,
  ) {
    await this.actorsService.update(+id, updateActorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.actorsService.remove(+id);
  }
}

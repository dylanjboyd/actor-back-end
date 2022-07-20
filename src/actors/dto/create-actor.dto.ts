import { ApiProperty } from '@nestjs/swagger';

export class CreateActorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  gender: number;

  @ApiProperty()
  popularity: number;

  @ApiProperty({ required: false })
  placeOfBirth?: string;
}

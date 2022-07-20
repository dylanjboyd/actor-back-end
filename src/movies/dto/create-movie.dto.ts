import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  adult: boolean;

  @ApiProperty()
  budget: number;

  @ApiProperty({ required: false })
  tagline?: string;
}

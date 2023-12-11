import { ApiProperty } from '@nestjs/swagger';

export class SearchMediaDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}

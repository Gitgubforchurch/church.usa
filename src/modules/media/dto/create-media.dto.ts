import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/base/dto/base.dto.';
import { MediaTypeEnum } from '../enum/media.enum';

export class CreateMediaDto extends BaseDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  media_url: string;

  @ApiProperty({
    example: MediaTypeEnum.AUDIO,
    enum: MediaTypeEnum,
    required: false,
  })
  @IsOptional()
  type: MediaTypeEnum;
}

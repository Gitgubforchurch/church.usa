import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, isString } from 'class-validator';
import { BaseDto } from 'src/base/dto/base.dto.';
import { File } from 'src/modules/file/entities/file.entity';

export class CreateAudioDto extends BaseDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  // @IsUrl()
  @IsString()
  audio_url: string;
}

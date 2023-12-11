import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MediaTypeEnum } from './enum/media.enum';
import { ListParamsDto } from 'src/base/dto/list-params.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Media files')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get('list')
  @ApiOperation({
    summary:
      'Получить список всего контента, всего что есть, без сортировки , сотировку я сделаю',
  })
  async getList(@Query() listParamsDto: ListParamsDto) {
    return await this.mediaService.list(listParamsDto);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Создание нового контента' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Название достижения',
          description: 'Название достижения',
        },
        description: {
          type: 'string',
          example: 'Достижение за проявленную отвагу и смелость',
          description: 'Описание достижения',
        },
        media_url: {
          type: 'string',
          example: 'Название достижения',
          description: 'Название достижения',
        },
        type: {
          type: 'string',
          enum: [MediaTypeEnum.AUDIO, MediaTypeEnum.NEWS, MediaTypeEnum.VIDEO],
          description: 'The type of media',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('media_url'))
  async createMedia(@Body() createMediaDto: CreateMediaDto) {
    return await this.mediaService.createMedia(createMediaDto);
  }
}

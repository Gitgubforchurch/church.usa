import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
  Delete,
  Param,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MediaTypeEnum } from './enum/media.enum';
import { ListParamsDto } from 'src/base/dto/list-params.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMediaDto } from './dto/create-media.dto';

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

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Создание нового контента' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Название медиа',
          description: 'Название',
        },
        description: {
          type: 'string',
          example: 'Медиа на первом канале',
          description: 'Описание',
        },
        media_url: {
          type: 'string',
          example: 'Ссылка на медиа',
          description: 'Ссылка',
        },
        type: {
          type: 'string',
          enum: [MediaTypeEnum.AUDIO, MediaTypeEnum.NEWS, MediaTypeEnum.VIDEO],
          description: 'Тип',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('media_url'))
  async createMedia(@Body() createMediaDto: CreateMediaDto) {
    return await this.mediaService.createMedia(createMediaDto);
  }

  @Get('/sorted/by/type')
  @ApiOperation({
    summary: 'Получить сортированный по типу медиа',
  })
  async findUsersByStatus(
    @Query() listParamsDto: ListParamsDto,
    @Query('type') type: MediaTypeEnum,
  ) {
    return await this.mediaService.listByENum(listParamsDto, type);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление одного из медиа по его ID' })
  async deleteMedia(@Param('id') id: number) {
    return await this.mediaService.deleteMedia(id);
  }
}

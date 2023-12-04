import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAudioDto } from '../audio/dto/create-audio.dto';

@ApiTags('Картинки')
@Controller('image')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @ApiOperation({ summary: 'Для отправки изображений' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  createImage(
    @UploadedFile() file: Express.Multer.File) {
    return this.fileService.createAudio(file);
  }

  // @Post('create')
  // @ApiOperation({summary:'Создание одного поста с аудио файлом'})
  // @UseInterceptors(FileInterceptor('auto'))
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema:{
  //     type:'object',
  //     properties:{
  //       title:{
  //         type:'string',
  //         example: 'Something new',
  //         description:'Title of the post'
  //       },
  //       description:{
  //         type:'string',
  //         example: 'Something new',
  //         description:'Title of the post'
  //       },
  //       file:{
  //         type: 'string',
  //         format: 'binary',
  //       }
  //     }
  //   }
  // })
  // createOneAudioPost(    @Body() creatOneAudioPostDto: CreateAudioDto,
  // @UploadedFile() file: Express.Multer.File,){
  //   return this.fileService.createOneAudioPost(creatOneAudioPostDto ,file)
  // }
}

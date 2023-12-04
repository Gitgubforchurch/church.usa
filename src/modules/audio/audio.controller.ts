import { Controller, Get, Post, Body, Patch, Param, Delete ,   UploadedFile,
  UseInterceptors,} from '@nestjs/common';
import { AudioService } from './audio.service';
import { CreateAudioDto } from './dto/create-audio.dto';
import { UpdateAudioDto } from './dto/update-audio.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Аудиофайлы')
@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post('create')
  async createOne(@Body() dto: CreateAudioDto){
    return await this.audioService.create(dto)
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
  //   return this.audioService.createOneAudioPost(creatOneAudioPostDto ,file)
  // }
}

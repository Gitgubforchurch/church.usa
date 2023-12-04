import { Injectable } from '@nestjs/common';
import { CreateAudioDto } from './dto/create-audio.dto';
import { UpdateAudioDto } from './dto/update-audio.dto';
import { BaseService } from 'src/base/base.service';
import { Audio } from './entities/audio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../file/entities/file.entity';
import { FileService } from '../file/file.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class AudioService extends BaseService<Audio> {
  constructor(
    @InjectRepository(Audio)
    private readonly audioRepo: Repository<Audio>,
    @InjectRepository(File)
    private readonly fileRepo: Repository<File>,
    private readonly fileService: FileService,
  ) {
    super(audioRepo);
  }

  async create(dto: CreateAudioDto) {
    const audio = new Audio();
    audio.absorbFromDto(dto);
    await this.audioRepo.save(audio);
    return audio;
  }

  // async createOneAudioPost(creatOneAudioPostDto: CreateAudioDto,file:Express.Multer.File){
  //   const audio = new Audio()
  //   if(!file){
  //     throw new BadRequestException('File is not provided!')
  //   }
  //   const audioFile = await this.fileService.createAudio(file)
  //   audio.absorbFromDto(creatOneAudioPostDto)
  //   audio.file = audioFile
  //   return await this.audioRepo.save(audio)
  // }
}

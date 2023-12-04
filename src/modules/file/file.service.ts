import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity'
import { Repository } from 'typeorm';
import { CloudinaryService } from '../../services/cloudinary/cloudinary.service';
import { Audio } from '../audio/entities/audio.entity';
import { CreateAudioDto } from '../audio/dto/create-audio.dto';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly imagesRepository: Repository<File>,
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(Audio)
    private readonly audioRepo:Repository<Audio>,
  ) {}

  async createAudio(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Provide image');
    }
    const cloudImage = await this.cloudinaryService.uploadAudio(file);
    const image = new File();
    image.publicId = cloudImage.public_id;
    image.url = cloudImage.secure_url;
    return this.imagesRepository.save(image);
  }
  
}

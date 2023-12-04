import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '../../services/cloudinary/cloudinary.modules';
import { FileService } from './file.service';
import { File } from './entities/file.entity';
import { FileController } from './file.controller';
import { Audio } from '../audio/entities/audio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File, Audio]), CloudinaryModule],
  providers: [FileService],
  controllers: [FileController],
  exports: [FileService],
})
export class FileModule {}

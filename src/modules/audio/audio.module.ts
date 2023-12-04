import { Module } from '@nestjs/common';
import { AudioService } from './audio.service';
import { AudioController } from './audio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audio } from './entities/audio.entity';
import { File } from '../file/entities/file.entity';
import { FileModule } from '../file/file.module';
import { CloudinaryModule } from 'src/services/cloudinary/cloudinary.modules';

@Module({
  imports:[TypeOrmModule.forFeature([Audio,File]),FileModule,CloudinaryModule],
  controllers: [AudioController],
  providers: [AudioService],
  // exports:[AudioService]
})
export class AudioModule {}

import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { BaseService } from 'src/base/base.service';
import { Media } from './entities/media.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchMediaDto } from './dto/search_media.dto';
import { MediaTypeEnum } from './enum/media.enum';
import { ListParamsDto } from 'src/base/dto/list-params.dto';
import { ListDto } from 'src/base/dto/list.dto';

@Injectable()
export class MediaService extends BaseService<Media> {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {
    super(mediaRepository);
  }

  async checkIdMediaExist(searchMediaDto: SearchMediaDto) {
    const media = await this.mediaRepository
      .createQueryBuilder('media')
      .where('media.title = : title', { title: searchMediaDto.title })
      .orWhere('media.description = : description', {
        description: searchMediaDto.description,
      })
      .getOne();
    return media;
  }

  async createMedia(createMediaDto: CreateMediaDto): Promise<Media> {
    const existingMedia = await this.mediaRepository.findOne({
      where: [
        { title: createMediaDto.title },
        { description: createMediaDto.description },
      ],
    });

    if (existingMedia) {
      return existingMedia;
    }
    const newMedia = this.mediaRepository.create({
      title: createMediaDto.title,
      description: createMediaDto.description,
      media_url: createMediaDto.media_url,
      type: createMediaDto.type || MediaTypeEnum.AUDIO,
    });

    return this.mediaRepository.save(newMedia);
  }

  async listByENum(listParamsDto: ListParamsDto, type: MediaTypeEnum) {
    const array = await this.repository
      .createQueryBuilder('media')
      .where('media.type = :type', { type })
      .limit(listParamsDto.limit)
      .offset(listParamsDto.countOffset())
      .orderBy(`media.${listParamsDto.getOrderedField()}`, listParamsDto.order)
      .getMany();
    const itemsCount = await this.repository.createQueryBuilder().getCount();
    return new ListDto(array, {
      page: listParamsDto.page,
      itemsCount,
      limit: listParamsDto.limit,
      order: listParamsDto.order,
      orderField: listParamsDto.orderField,
    });
  }

  async deleteMedia(id: number) {
    const mediaForDelete = await this.get(id);
    mediaForDelete.isDeleted = true;
    return await this.mediaRepository.delete({ id });
  }
}

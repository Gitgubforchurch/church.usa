import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';
import { MediaTypeEnum } from '../enum/media.enum';

@Entity()
export class Media extends BaseEntity {
  @Column({
    nullable: true,
  })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    nullable: true,
  })
  media_url: string;

  @Column({
    type: 'enum',
    enum: MediaTypeEnum,
    default: MediaTypeEnum.AUDIO,
  })
  type: MediaTypeEnum;

  @Column({
    default: false,
  })
  isDeleted: boolean;
}

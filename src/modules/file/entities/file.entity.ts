import { IsString } from 'class-validator';
import { BaseEntity } from 'src/base/base.entity';
import { Audio } from 'src/modules/audio/entities/audio.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class File extends BaseEntity {
  @Column()
  @IsString()
  url: string;

  @Column()
  publicId: string;
}

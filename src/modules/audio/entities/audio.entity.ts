import { BaseEntity } from 'src/base/base.entity';
import { File } from 'src/modules/file/entities/file.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class Audio extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    nullable: true,
  })
  audio_url: string;
}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaModule } from './modules/media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'postgres',
        url: 'postgres://whcyiziqkeuqah:d4f52c12df1dac6e95e98c023786ccaa655af12c15972e65faf9d9cb3f47faa3@ec2-44-206-204-65.compute-1.amazonaws.com:5432/d9vuo9nv3igbmd',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
    MediaModule,
  ],
})
export class AppModule {}

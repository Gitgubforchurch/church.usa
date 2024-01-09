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
        url: 'postgres://lwisezsnsjeaqu:e778927723bad18249f1698696a8c02956e9cb05980519f0d779e3853eba8a6a@ec2-34-195-81-92.compute-1.amazonaws.com:5432/dck73god9mu0pb',
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

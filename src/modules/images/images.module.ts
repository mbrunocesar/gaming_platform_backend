import { Module } from '@nestjs/common';
import { ImagesService } from './services/images.service';
import { ImagesController } from './controllers/images.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { ImagesRepository } from './repositories/images-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImagesController],
  providers: [
    ImagesService,
    {
      provide: getRepositoryToken(Image),
      useClass: ImagesRepository,
    },
  ],
})
export class ImagesModule {}

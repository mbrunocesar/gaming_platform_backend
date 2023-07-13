import { Module } from '@nestjs/common';
import { GenresService } from './services/genres.service';
import { GenresController } from './controllers/genres.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { GenresRepository } from './repositories/genres-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  controllers: [GenresController],
  providers: [
    GenresService,
    {
      provide: getRepositoryToken(Genre),
      useClass: GenresRepository,
    },
  ],
})
export class GenresModule {}

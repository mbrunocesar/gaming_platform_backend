import { Module } from '@nestjs/common';
import { GamesService } from './services/games.service';
import { GamesController } from './controllers/games.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { GamesRepository } from './repositories/games-repository';
import { Image } from '../images/entities/image.entity';
import { ImagesRepository } from '../images/repositories/images-repository';
import { ImagesService } from '../images/services/images.service';
import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/repositories/users-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  controllers: [GamesController],
  providers: [
    GamesService,
    ImagesService,
    {
      provide: getRepositoryToken(Game),
      useClass: GamesRepository,
    },
    {
      provide: getRepositoryToken(Image),
      useClass: ImagesRepository,
    },
    {
      provide: getRepositoryToken(User),
      useClass: UsersRepository,
    },
  ],
})
export class GamesModule {}

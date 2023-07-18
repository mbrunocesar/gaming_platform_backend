import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users-repository';
import { Game } from '../games/entities/game.entity';
import { GamesRepository } from '../games/repositories/games-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: getRepositoryToken(User),
      useClass: UsersRepository,
    },
    {
      provide: getRepositoryToken(Game),
      useClass: GamesRepository,
    },
  ],
})
export class UsersModule {}

import { InjectConnection } from '@nestjs/typeorm';
import { BaseRepository } from '@shared/base-repository/base-repository';
import { IFindManyOptions } from '@shared/base-repository/helpers/paginate-helper/i-paginate';
import { Connection, Repository } from 'typeorm';
import { CreateGameDto } from '../dto/create-game.dto';
import { Game } from '../entities/game.entity';
import { IGamesRepository } from './i-games-repository';

export class GamesRepository
  extends BaseRepository<Game>
  implements IGamesRepository
{
  private gamesRepository: Repository<Game>;

  constructor(@InjectConnection() connection: Connection) {
    super();

    this.gamesRepository = connection.getRepository(Game);
  }

  create(createGameDto: CreateGameDto): Game {
    return this.gamesRepository.create(createGameDto);
  }

  save(game: Game | CreateGameDto): Promise<Game> {
    return this.gamesRepository.save(game);
  }

  findAndCount(options?: IFindManyOptions): Promise<[Game[], number]> {
    return this.gamesRepository.findAndCount(options);
  }

  findOne(gameId: number, relations?: string[]): Promise<Game[]> {
    return this.gamesRepository.find({ where: { game_id: gameId }, relations });
  }
}

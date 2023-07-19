import { InjectConnection } from '@nestjs/typeorm';
import { BaseRepository } from '@shared/base-repository/base-repository';
import { IFindManyOptions } from '@shared/base-repository/helpers/paginate-helper/i-paginate';
import {
  Connection,
  And,
  In,
  Like,
  LessThan,
  MoreThan,
  Repository
} from 'typeorm';
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

  findAll(relations?: string[]): Promise<Game[]> {
    return this.gamesRepository.find({ relations });
  }

  findOne(gameId: number, relations?: string[]): Promise<Game> {
    return this.gamesRepository.findOne({ where: { game_id: gameId }, relations });
  }

  findByFilters(filters, relations?: string[]): Promise<Game[]> {
    let where = {
      title: null,
      launch_date: null,
      price_in_cents: null,
    };

    if (filters.title) {
      where.title = Like(`%${filters.title}%`);
    }

    if (filters.launch_date_newer && filters.launch_date_older) {
      where.launch_date = And(
        MoreThan(filters.launch_date_newer),
        LessThan(filters.launch_date_older)
      );
    } else if (filters.launch_date_newer) {
      where.launch_date = MoreThan(filters.launch_date_newer);
    } else if (filters.launch_date_older) {
      where.launch_date = LessThan(filters.launch_date_older);
    }

    if (filters.price_in_cents_lower && filters.price_in_cents_higher) {
      where.price_in_cents = And(
        MoreThan(filters.price_in_cents_lower),
        LessThan(filters.price_in_cents_higher)
      );
    } else if (filters.price_in_cents_lower) {
      where.price_in_cents = MoreThan(filters.price_in_cents_lower);
    } else if (filters.price_in_cents_higher) {
      where.price_in_cents = LessThan(filters.price_in_cents_higher);
    }


    // { genre_id: In(genreIds) }

    return this.gamesRepository.find({ where , relations });
  }
}

import { IBaseRepository } from '@shared/base-repository/i-base-repository';
import { CreateGameDto } from '../dto/create-game.dto';
import { Game } from '../entities/game.entity';

export interface IGamesRepository extends IBaseRepository<Game> {
  create(createGameDto: CreateGameDto): Game;

  save(game: Game | CreateGameDto): Promise<Game>;

  findAll(relations?: string[]): Promise<Game[]>;

  findOne(gameId: number, relations?: string[]): Promise<Game>;

  findByFilters(filters, relations?: string[]): Promise<Game[]>;
}

import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';
import { IPaginate } from '@shared/base-repository/helpers/paginate-helper/i-paginate';
import { CreateGameDto } from '../dto/create-game.dto';
import { Game } from '../entities/game.entity';

export interface IGamesService {
  create(createGameDto: CreateGameDto): Promise<{ id: number }>;

  findAll(): Promise<Game[]>;

  findOne(gameId: number): Promise<Game>;
}

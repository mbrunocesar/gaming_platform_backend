import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';
import { IPaginate } from '@shared/base-repository/helpers/paginate-helper/i-paginate';
import { CreateGameDto } from '../dto/create-game.dto';
import { Game } from '../entities/game.entity';
import { IGamesRepository } from '../repositories/i-games-repository';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: IGamesRepository,
  ) {}

  async create(createGameDto: CreateGameDto) {
    const game = await this.gamesRepository.save(createGameDto);

    return { id: game.game_id };
  }

  async findOne(
    gameId: number,
  ): Promise<Game[]> {
    return this.gamesRepository.findOne(gameId, ['images', 'genres', 'builds']);
  }

  async findAll(
    paginateRequestDto: PaginateRequestDto,
  ): Promise<IPaginate<Game>> {
    return this.gamesRepository.paginate(paginateRequestDto, ['images']);
  }
}

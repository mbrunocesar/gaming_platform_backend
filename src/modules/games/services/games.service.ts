import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';
import { IPaginate } from '@shared/base-repository/helpers/paginate-helper/i-paginate';
import { CreateGameDto } from '../dto/create-game.dto';
import { FiltersDto } from '../dto/filters.dto';
import { Game } from '../entities/game.entity';
import { IGamesRepository } from '../repositories/i-games-repository';

import { GenresService } from '../../genres/services/genres.service';
import { ImagesService } from '../../images/services/images.service';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: IGamesRepository,
    private readonly genresService: GenresService,
    private readonly imagesService: ImagesService
  ) {}

  async create(createGameDto: CreateGameDto) {
    const game = await this.gamesRepository.save(createGameDto);

    if (createGameDto.genre_ids && createGameDto.genre_ids.length > 0) {
      const genres = await this.genresService.findByIds(createGameDto.genre_ids);
      game.genres = genres;
      await this.gamesRepository.save(game);
    }

    if (createGameDto.image_ids && createGameDto.image_ids.length > 0) {
      await this.imagesService.linkToGame(createGameDto.image_ids, game.game_id);
    }

    return { id: game.game_id };
  }

  async findOne(gameId: number): Promise<Game> {
    return this.gamesRepository.findOne(gameId, ['images', 'genres', 'builds']);
  }

  async findAll(): Promise<Game[]> {
    return this.gamesRepository.findAll(['images', 'genres']);
  }


// - Implementar busca por nome do jogo.
// - Implementar filtros por gênero, preço e data.
  async findByFilters(filtersDto: FiltersDto): Promise<Game[]> {
    const games = this.gamesRepository.findByFilters(filtersDto, ['images', 'genres']);

    return games;
  }
}

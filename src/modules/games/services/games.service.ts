import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';
import { IPaginate } from '@shared/base-repository/helpers/paginate-helper/i-paginate';
import { CreateGameDto } from '../dto/create-game.dto';
import { Game } from '../entities/game.entity';
import { Image } from '../../images/entities/image.entity';
import { User } from '../../users/entities/user.entity';
import { IGamesRepository } from '../repositories/i-games-repository';
import { IImagesRepository } from '../../images/repositories/i-images-repository';
import { IUsersRepository } from '../../users/repositories/i-users-repository';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: IGamesRepository,

    @InjectRepository(Image)
    private imagesRepository: IImagesRepository,

    @InjectRepository(User)
    private usersRepository: IUsersRepository,
  ) {}

  async create(createGameDto: CreateGameDto) {
    const game = await this.gamesRepository.save(createGameDto);

    return { id: game.game_id };
  }

  async findAll(
    paginateRequestDto: PaginateRequestDto,
  ): Promise<IPaginate<Game>> {
    return this.gamesRepository.paginate(paginateRequestDto, ['images']);
  }
}

import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { GamesService } from '../services/games.service';
import { CreateGameDto } from '../dto/create-game.dto';
import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  findAll(@Query() paginateRequestDto: PaginateRequestDto) {
    return this.gamesService.findAll(paginateRequestDto);
  }
}

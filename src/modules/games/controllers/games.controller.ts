import { Controller, Get, Post, Param, Body, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GamesService } from '../services/games.service';
import { CreateGameDto } from '../dto/create-game.dto';
import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  findAll(@Query() paginateRequestDto: PaginateRequestDto) {
    return this.gamesService.findAll(paginateRequestDto);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  findOne(@Param('id') id:number) {
    return this.gamesService.findOne(id);
  }
}

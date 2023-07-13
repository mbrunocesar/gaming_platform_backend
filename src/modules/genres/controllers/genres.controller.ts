import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { GenresService } from '../services/genres.service';
import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  findAll(@Query() paginateRequestDto: PaginateRequestDto) {
    return this.genresService.findAll(paginateRequestDto);
  }
}

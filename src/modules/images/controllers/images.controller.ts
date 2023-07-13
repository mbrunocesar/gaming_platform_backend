import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ImagesService } from '../services/images.service';
import { CreateImageDto } from '../dto/create-image.dto';
import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Get()
  findAll(@Query() paginateRequestDto: PaginateRequestDto) {
    return this.imagesService.findAll(paginateRequestDto);
  }
}

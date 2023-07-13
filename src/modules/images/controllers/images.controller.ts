import { Controller, Get, Post, Body, UploadedFile, UseInterceptors, Query } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";

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

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    if (!file) {
      return new Error('422 - Unprocessable Entity');
    }
    const uploadedFile = await this.imagesService.uploadFile(file.buffer, file.originalname);

    return uploadedFile;
  }


  @Get()
  findAll(@Query() paginateRequestDto: PaginateRequestDto) {
    return this.imagesService.findAll(paginateRequestDto);
  }
}

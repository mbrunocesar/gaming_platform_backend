import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';
import { IPaginate } from '@shared/base-repository/helpers/paginate-helper/i-paginate';
import { CreateImageDto } from '../dto/create-image.dto';
import { Image } from '../entities/image.entity';
import { IImagesRepository } from '../repositories/i-images-repository';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image) private imagesRepository: IImagesRepository,
  ) {}

  async create(createImageDto: CreateImageDto) {
    const image = await this.imagesRepository.save(createImageDto);

    return { id: image.image_id };
  }

  async findAll(
    paginateRequestDto: PaginateRequestDto,
  ): Promise<IPaginate<Image>> {
    return this.imagesRepository.paginate(paginateRequestDto);
  }
}

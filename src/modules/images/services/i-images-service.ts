import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';
import { IPaginate } from '@shared/base-repository/helpers/paginate-helper/i-paginate';
import { CreateImageDto } from '../dto/create-image.dto';
import { Image } from '../entities/image.entity';

export interface IImagesService {
  create(createImageDto: CreateImageDto): Promise<{ id: number }>;

  findAll(paginateRequestDto: PaginateRequestDto): Promise<IPaginate<Image>>;

  linkToGame(imageIds: number[], gameId: number);
}

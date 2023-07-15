import { IBaseRepository } from '@shared/base-repository/i-base-repository';
import { CreateImageDto } from '../dto/create-image.dto';
import { Image } from '../entities/image.entity';

export interface IImagesRepository extends IBaseRepository<Image> {
  create(createImageDto: CreateImageDto): Image;

  save(image: Image | CreateImageDto): Promise<Image>;

  linkToGame(imageIds: number[], gameId: number);
}

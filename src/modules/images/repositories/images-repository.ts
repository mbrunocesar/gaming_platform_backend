import { InjectConnection } from '@nestjs/typeorm';
import { BaseRepository } from '@shared/base-repository/base-repository';
import { IFindManyOptions } from '@shared/base-repository/helpers/paginate-helper/i-paginate';
import { Connection, In, Repository } from 'typeorm';
import { CreateImageDto } from '../dto/create-image.dto';
import { Image } from '../entities/image.entity';
import { IImagesRepository } from './i-images-repository';

export class ImagesRepository
  extends BaseRepository<Image>
  implements IImagesRepository
{
  private imagesRepository: Repository<Image>;

  constructor(@InjectConnection() connection: Connection) {
    super();

    this.imagesRepository = connection.getRepository(Image);
  }

  create(createImageDto: CreateImageDto): Image {
    return this.imagesRepository.create(createImageDto);
  }

  save(image: Image | CreateImageDto): Promise<Image> {
    return this.imagesRepository.save(image);
  }

  findAndCount(options?: IFindManyOptions): Promise<[Image[], number]> {
    return this.imagesRepository.findAndCount(options);
  }

  linkToGame(imageIds: number[], gameId: number) {
    return this.imagesRepository.update({ image_id: In(imageIds) }, { game_id: gameId });
  }
}

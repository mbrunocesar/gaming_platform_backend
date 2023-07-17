import { InjectConnection } from '@nestjs/typeorm';
import { BaseRepository } from '@shared/base-repository/base-repository';
import { IFindManyOptions } from '@shared/base-repository/helpers/paginate-helper/i-paginate';
import { Connection, In, Repository } from 'typeorm';
import { Genre } from '../entities/genre.entity';
import { IGenresRepository } from './i-genres-repository';

export class GenresRepository
  extends BaseRepository<Genre>
  implements IGenresRepository
{
  private genresRepository: Repository<Genre>;

  constructor(@InjectConnection() connection: Connection) {
    super();

    this.genresRepository = connection.getRepository(Genre);
  }

  findAndCount(options?: IFindManyOptions): Promise<[Genre[], number]> {
    return this.genresRepository.findAndCount(options);
  }

  findByIds(genreIds: number[]): Promise<Genre[]> {
    return this.genresRepository.find({ where: { genre_id: In(genreIds) } });
  }
}

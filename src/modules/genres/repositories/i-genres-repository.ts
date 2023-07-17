import { IBaseRepository } from '@shared/base-repository/i-base-repository';
import { Genre } from '../entities/genre.entity';

export interface IGenresRepository extends IBaseRepository<Genre> {
  findByIds(genreIds: number[]): Promise<Genre[]>;
}

import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';
import { IPaginate } from '@shared/base-repository/helpers/paginate-helper/i-paginate';
import { Genre } from '../entities/genre.entity';

export interface IGenresService {
  findAll(paginateRequestDto: PaginateRequestDto): Promise<IPaginate<Genre>>;
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';
import { IPaginate } from '@shared/base-repository/helpers/paginate-helper/i-paginate';
import { Genre } from '../entities/genre.entity';
import { IGenresRepository } from '../repositories/i-genres-repository';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre) private genresRepository: IGenresRepository,
  ) {}

  async findAll(
    paginateRequestDto: PaginateRequestDto,
  ): Promise<IPaginate<Genre>> {
    return this.genresRepository.paginate(paginateRequestDto);
  }

  async findByIds(genreIds: number[]) : Promise<Genre[]> {
    return this.genresRepository.findByIds(genreIds);
  }

}

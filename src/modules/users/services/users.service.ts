import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';
import { IPaginate } from '@shared/base-repository/helpers/paginate-helper/i-paginate';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { IUsersRepository } from '../repositories/i-users-repository';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: IUsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await hash(createUserDto.password, 10);
    const user = await this.usersRepository.save(createUserDto);

    return { id: user.user_id };
  }

  async findAll(
    paginateRequestDto: PaginateRequestDto,
  ): Promise<IPaginate<User>> {
    return this.usersRepository.paginate(paginateRequestDto);
  }

  /*
  async comparePassword(attempt: string): Promise<boolean> {
      return await compare(attempt, this.password);
  }
  */
}

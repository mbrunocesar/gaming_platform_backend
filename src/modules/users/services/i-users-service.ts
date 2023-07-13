import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';
import { IPaginate } from '@shared/base-repository/helpers/paginate-helper/i-paginate';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { User } from '../entities/user.entity';

export interface IUsersService {
  create(createUserDto: CreateUserDto): Promise<{ id: number }>;

  findAll(paginateRequestDto: PaginateRequestDto): Promise<IPaginate<User>>;

  findOne(loginDto: LoginDto, relations?: string[]): Promise<User[]>;
}

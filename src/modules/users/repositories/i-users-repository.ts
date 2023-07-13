import { IBaseRepository } from '@shared/base-repository/i-base-repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { User } from '../entities/user.entity';

export interface IUsersRepository extends IBaseRepository<User> {
  create(createUserDto: CreateUserDto): User;

  save(user: User | CreateUserDto): Promise<User>;

  findOne(loginDto: LoginDto, relations?: string[]): Promise<User[]>;
}

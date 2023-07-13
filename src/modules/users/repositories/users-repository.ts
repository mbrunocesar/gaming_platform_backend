import { InjectConnection } from '@nestjs/typeorm';
import { BaseRepository } from '@shared/base-repository/base-repository';
import { IFindManyOptions } from '@shared/base-repository/helpers/paginate-helper/i-paginate';
import { Connection, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { User } from '../entities/user.entity';
import { IUsersRepository } from './i-users-repository';

export class UsersRepository
  extends BaseRepository<User>
  implements IUsersRepository
{
  private usersRepository: Repository<User>;

  constructor(@InjectConnection() connection: Connection) {
    super();

    this.usersRepository = connection.getRepository(User);
  }

  create(createUserDto: CreateUserDto): User {
    return this.usersRepository.create(createUserDto);
  }

  save(user: User | CreateUserDto): Promise<User> {
    return this.usersRepository.save(user);
  }

  findAndCount(options?: IFindManyOptions): Promise<[User[], number]> {
    return this.usersRepository.findAndCount(options);
  }

  findOne(loginDto: LoginDto, relations?: string[]): Promise<User[]> {
    return this.usersRepository.find({ where: { email: loginDto.email }, relations });
  }
}

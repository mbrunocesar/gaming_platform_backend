import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';
import { IPaginate } from '@shared/base-repository/helpers/paginate-helper/i-paginate';
import { AcquireGameDto } from '../dto/acquire-game.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';

import { User } from '../entities/user.entity';
import { Game } from '../../games/entities/game.entity';

export interface IUsersService {
  create(createUserDto: CreateUserDto): Promise<{ id: number }>;

  login(loginDto: LoginDto): Promise<User>;

  acquireGame(acquireGameDto: AcquireGameDto): User;

  listAcquiredGames(user_id: number);
}

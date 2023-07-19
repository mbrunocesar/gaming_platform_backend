import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';
import { IPaginate } from '@shared/base-repository/helpers/paginate-helper/i-paginate';
import { JwtService } from '@nestjs/jwt';
import { AcquireGameDto } from '../dto/acquire-game.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { User } from '../entities/user.entity';
import { Game } from '../../games/entities/game.entity';
import { IUsersRepository } from '../repositories/i-users-repository';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: IUsersRepository,

    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.developer) {
      createUserDto.developer = false;
    }
    createUserDto.password = await hash(createUserDto.password, 10);
    const user = await this.usersRepository.save(createUserDto);

    return { id: user.user_id };
  }

  async acquireGame(acquireGameDto: AcquireGameDto) {
    const user = await this.usersRepository.findOne(acquireGameDto.user_id, ['games']);

    const game = new Game();
    game.game_id = acquireGameDto.game_id;
    user.games.push(game);

    return await this.usersRepository.save(user);
  }

  async listAcquiredGames(user_id: number) {
    const user = await this.usersRepository.findOne(user_id, ['games']);

    if (!user) {
      return { error: 'unauthorized' };
    }

    return user.games;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findLogin(loginDto);

    if (!user) {
      return { error: 'unauthorized' };
    }

    const isValidLogin = await compare(loginDto.password, user.password);
    if (!isValidLogin) {
      return { error: 'unauthorized' };
    }

    const access_token = await this.jwtService.sign(
      {
        id: user.user_id,
        email: user.email,
        developer: user.developer,
      },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '3600s',
      },
    );
    return { bearer: access_token };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';
import { IPaginate } from '@shared/base-repository/helpers/paginate-helper/i-paginate';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { User } from '../entities/user.entity';
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
    createUserDto.password = await hash(createUserDto.password, 10);
    const user = await this.usersRepository.save(createUserDto);

    return { id: user.user_id };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne(loginDto);

    if (!user || user.length !== 1) {
      return [];
    }

    const isValidLogin = await compare(loginDto.password, user[0].password);
    if (!isValidLogin) {
      return []
    }

    const access_token = await this.jwtService.sign(
      { email: loginDto.email },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '3600s',
      },
    );
    return access_token;
  }

  async findAll(
    paginateRequestDto: PaginateRequestDto,
  ): Promise<IPaginate<User>> {
    return this.usersRepository.paginate(paginateRequestDto);
  }
}

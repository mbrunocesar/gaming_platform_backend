import { Controller, Get, Post, Param, Body, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';
import { UsersService } from '../services/users.service';
import { AcquireGameDto } from '../dto/acquire-game.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @Post('/signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/acquire-game')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  acquireGame(@Body() acquireGameDto: AcquireGameDto) {
    return this.usersService.acquireGame(acquireGameDto);
  }

  @Get('/:id/games')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  listAcquiredGame(@Param('id') id: number) {
    return this.usersService.listAcquiredGames(id);
  }
}

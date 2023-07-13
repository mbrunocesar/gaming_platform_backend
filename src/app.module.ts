import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesModule } from './modules/games/games.module';
import { GenresModule } from './modules/genres/genres.module';
import { ImagesModule } from './modules/images/images.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './shared/auth/auth.module';
import { DATABASE_CONFIGS } from '@shared/database';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(DATABASE_CONFIGS),
    AuthModule,
    GamesModule,
    GenresModule,
    ImagesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

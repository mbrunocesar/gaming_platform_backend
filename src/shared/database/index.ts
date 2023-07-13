import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Image } from "../../modules/images/entities/image.entity";
import { Game } from "../../modules/games/entities/game.entity";
import { Genre } from "../../modules/genres/entities/genre.entity";
import { User } from "../../modules/users/entities/user.entity";
import { BuildVersion } from "../../modules/games/entities/build-version.entity";

export const DATABASE_CONFIGS = <TypeOrmModuleAsyncOptions>{
  useFactory: async () => {
    let dbConnectionInfo;

    const entitiesList = [
      BuildVersion,
      Image,
      Game,
      Genre,
      User
    ];

    if (process.env.NODE_ENV === 'test') {
       dbConnectionInfo = {
        type: 'mysql',
        host: process.env.DB_TEST_HOSTNAME,
        port: parseInt(process.env.DB_TEST_PORT),
        username: process.env.DB_TEST_USERNAME,
        password: process.env.DB_TEST_PASSWORD,
        database: process.env.DB_TEST_DATABASE,
        entities: entitiesList,
        //synchronize: true,
        //dropSchema: true,
      };
    } else {
      dbConnectionInfo = {
        type: 'mysql',
        host: process.env.TYPEORM_HOST,
        port: parseInt(process.env.TYPEORM_PORT),
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        entities: entitiesList,
      };
    }

    return dbConnectionInfo;
  },
};

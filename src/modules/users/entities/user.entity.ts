import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

import { Game } from '../../games/entities/game.entity';

@Entity({ name: 'Users' })
export class User {
  constructor(createUserDto?: CreateUserDto) {
    if (createUserDto) {
      this.name = createUserDto.name;
      this.email = createUserDto.email;
      this.password =  createUserDto.password;
      this.developer = createUserDto.developer;
    }
  }

  @PrimaryGeneratedColumn('increment')
  user_id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column('bool')
  developer: boolean;

  @ManyToMany(() => Game)
  @JoinTable({
    name: 'ClientGames',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'user_id',
    },
    inverseJoinColumn: {
      name: 'game_id',
      referencedColumnName: 'game_id',
    },
  })
  games: Game[];
}

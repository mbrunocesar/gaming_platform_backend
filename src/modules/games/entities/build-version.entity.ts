import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Game } from './game.entity';

@Entity({ name: 'BuildVersions' })
export class BuildVersion {
  @PrimaryGeneratedColumn('increment')
  build_id: number;

  @Column({ type: 'varchar' })
  version: string;

  @Column()
  game_id: number;

  @ManyToOne(() => Game, (game) => game.game_id)
  @JoinColumn({ name: 'game_id' })
  game: Game;
}

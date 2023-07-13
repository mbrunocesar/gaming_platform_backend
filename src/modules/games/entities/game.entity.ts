import { Column, Entity, JoinColumn, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CreateGameDto } from '../dto/create-game.dto';
import { Image } from '../../images/entities/image.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'Games' })
export class Game {
  constructor(createGameDto?: CreateGameDto) {
    if (createGameDto) {
      this.url = createGameDto.url;
      this.title = createGameDto.title;
      this.description = createGameDto.description;
      this.short_description = createGameDto.short_description;
      this.author = createGameDto.author;
      this.operating_system = createGameDto.operating_system;
      this.launch_date = createGameDto.launch_date;
      this.price_in_cents = createGameDto.price_in_cents;
      this.developer_id = createGameDto.developer_id;
    }
  }

  @PrimaryGeneratedColumn('increment')
  game_id: number;

  @Column({ type: 'varchar', unique: true })
  url: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  short_description: string;

  @Column({ type: 'varchar' })
  author: string;

  @Column({ type: 'varchar' })
  operating_system: string;

  @Column({ type: 'date' })
  launch_date: Date;

  @Column({ type: 'int' })
  price_in_cents: number;

  @Column()
  developer_id: number;

  @ManyToOne(() => User, (user) => user.user_id)
  @JoinColumn({ name: 'developer_id' })
  developer: User;

  @OneToMany(() => Image, (image) => image.game)
  images: Image[];
}

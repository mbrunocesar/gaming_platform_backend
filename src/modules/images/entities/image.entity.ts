import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CreateImageDto } from '../dto/create-image.dto';
import { Game } from '../../games/entities/game.entity';

@Entity({ name: 'Images' })
export class Image {
  constructor(createImageDto?: CreateImageDto) {
    if (createImageDto) {
      this.url = createImageDto.url;
      this.alt_text = createImageDto.alt_text;
      this.type =  createImageDto.type;
      this.game_id = createImageDto.game_id;
    }
  }

  @PrimaryGeneratedColumn('increment')
  image_id: number;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'varchar', unique: true })
  alt_text: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column()
  game_id: number;

/*
  @ManyToOne(() => Game, (game) => game.images)
  @JoinColumn({ name: 'game_id' })
  game: Game;
*/
}

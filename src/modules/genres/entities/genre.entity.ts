import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Genres' })
export class Genre {
  @PrimaryGeneratedColumn('increment')
  genre_id: number;

  @Column({ type: 'varchar' })
  name: string;
}

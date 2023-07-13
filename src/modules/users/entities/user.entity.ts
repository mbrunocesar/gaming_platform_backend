import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

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
  developer: boolean
}

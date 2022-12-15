import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { IsEmail, IsOptional, IsUrl, Length } from 'class-validator';
import { Wish } from 'src/wishes/entities/wish.entity';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 30)
  username: string;

  @Column()
  @IsOptional()
  @Length(2, 200)
  about = 'Пока ничего не рассказал о себе';

  @Column()
  @IsOptional()
  @IsUrl()
  avatar = 'https://i.pravatar.cc/300';

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @Column()
  @OneToMany(() => Wish, (wish) => wish.id) //!????????????????
  offers: Wish[];

  @Column()
  wishlists: ''; //! Добавить тип колонки и тип связи после описания сущности "Wishlist"

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

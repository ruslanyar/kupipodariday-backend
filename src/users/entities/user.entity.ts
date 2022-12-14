import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { IsEmail, IsOptional, IsUrl, Length } from 'class-validator';

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
  wishes: ''; //! Добавить тип колонки и тип связи после описания сущности "Wishes"

  @Column()
  offers: ''; //! Добавить тип колонки и тип связи после описания сущности "offers"

  @Column()
  wishlists: ''; //! Добавить тип колонки и тип связи после описания сущности "Wishes"

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

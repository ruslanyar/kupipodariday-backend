import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsUrl, Length, MaxLength } from 'class-validator';

import { Wish } from 'src/wishes/entities/wish.entity';
import { WishPartialDto } from 'src/wishes/dto/wish-partial.dto';
import { UserPublicProfileResponseDto } from 'src/users/dto/user-public-profile-response.dto';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @MaxLength(1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: UserPublicProfileResponseDto;

  @ManyToMany(() => Wish)
  @JoinTable()
  items: WishPartialDto[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { IsEmail, IsOptional, IsUrl, Length } from 'class-validator';
import { Exclude } from 'class-transformer';

import { Base } from 'src/utils/base.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User extends Base {
  @Column()
  @Length(2, 30)
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @IsOptional()
  @Length(2, 200)
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsOptional()
  @IsUrl()
  avatar: string;

  @Column()
  @IsEmail()
  @Exclude()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @OneToMany(() => Wishlist, (list) => list.owner)
  wishlists: Wishlist[];
}

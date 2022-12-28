import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { IsEmail, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

import { Base } from 'src/utils/base-entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import { GROUP_USER } from 'src/utils/constants';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User extends Base {
  @Column()
  @Length(2, 30)
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @IsOptional()
  @IsString()
  @Length(2, 200)
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsOptional()
  @IsUrl()
  avatar: string;

  @Column()
  @Expose({ groups: [GROUP_USER] })
  @IsEmail()
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

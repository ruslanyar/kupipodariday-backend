import { IsUrl, Length } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { Base } from 'src/utils/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Offer } from 'src/offers/entities/offer.entity';

import { ColumnNumericTransformer } from 'src/utils/column-numeric-transformer';

@Entity()
export class Wish extends Base {
  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column()
  @Length(1, 1024)
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @Column({ default: 0 })
  copied: number;
}

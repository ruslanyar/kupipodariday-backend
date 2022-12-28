import { Column, Entity, ManyToOne } from 'typeorm';

import { Base } from 'src/utils/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

import { ColumnNumericTransformer } from 'src/utils/column-numeric-transformer';

@Entity()
export class Offer extends Base {
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @Column({ default: false })
  hidden: boolean;

  @ManyToOne(() => User, (user) => user.offers)
  user: User;
}

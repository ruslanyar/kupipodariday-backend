import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { IsOptional, IsUrl, Length, MaxLength } from 'class-validator';

import { Base } from 'src/utils/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

import { WishPartialDto } from 'src/wishes/dto/wish-partial.dto';
import { UserPublicProfileResponseDto } from 'src/users/dto/user-public-profile-response.dto';

@Entity()
export class Wishlist extends Base {
  @Column()
  @Length(1, 250)
  name: string;

  @Column({ nullable: true })
  @MaxLength(1500)
  @IsOptional()
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: UserPublicProfileResponseDto;

  @ManyToMany(() => Wish)
  @JoinTable()
  items: WishPartialDto[];
}

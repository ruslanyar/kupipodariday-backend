import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { Wishlist } from './entities/wishlist.entity';

import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistsRepository: Repository<Wishlist>,
  ) {}

  create(createWishlistDto: CreateWishlistDto, ownerId: number) {
    const { itemsId, ...rest } = createWishlistDto;
    const items = itemsId.map((id) => ({ id }));
    const wishList = this.wishlistsRepository.create({
      ...rest,
      items,
      owner: { id: ownerId },
    });
    return this.wishlistsRepository.save(wishList);
  }

  findMany(query: FindManyOptions<Wishlist>) {
    return this.wishlistsRepository.find(query);
  }

  findOne(query: FindOneOptions<Wishlist>) {
    return this.wishlistsRepository.findOne(query);
  }

  getWishlists() {
    return this.findMany({
      relations: ['items', 'owner'],
    });
  }

  getById(id: number) {
    return this.findOne({
      where: { id },
      relations: ['items', 'owner'],
    });
  }

  async update(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
    userId: number,
  ) {
    const wishlist = await this.findOne({
      where: { id },
      relations: { owner: true },
    });

    if (wishlist.owner.id !== userId) {
      throw new ForbiddenException(
        'Вы не можете редактировать чужие списки подарков',
      );
    }

    const { itemsId, ...rest } = updateWishlistDto;
    const items = itemsId.map((id) => ({ id }));
    const updatedWishlist = { ...rest, items };

    await this.wishlistsRepository.update(id, updatedWishlist);
    return this.findOne({ where: { id } });
  }

  async delete(id: number, userId: number) {
    const wishlist = await this.findOne({
      where: { id },
      relations: { owner: true },
    });

    if (wishlist.owner.id !== userId) {
      throw new ForbiddenException(
        'Вы не можете удалять чужие списки подарков',
      );
    }

    await this.wishlistsRepository.delete(id);
    return wishlist;
  }
}

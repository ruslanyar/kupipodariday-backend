import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';

import { Wish } from './entities/wish.entity';

import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
  ) {}

  create(createWishDto: CreateWishDto, ownerId: number) {
    const wish = this.wishesRepository.create({
      ...createWishDto,
      owner: { id: ownerId },
    });
    return this.wishesRepository.save(wish);
  }

  findMany(query: FindManyOptions<Wish>) {
    return this.wishesRepository.find(query);
  }

  findOne(query: FindOneOptions<Wish>) {
    return this.wishesRepository.findOne(query);
  }

  async update(id: number, userId: number, updateWishDto: UpdateWishDto) {
    const wish = await this.findOne({
      where: { id },
    });

    if (userId !== wish.owner.id) {
      throw new ForbiddenException();
    }

    return this.wishesRepository.update(id, updateWishDto);
  }

  async remove(id: number, userId: number) {
    const wish = await this.findOne({
      where: { id },
    });

    if (userId !== wish.owner.id) {
      throw new ForbiddenException();
    }

    return this.wishesRepository.delete(id);
  }

  async copy(wishId: number, userId: number) {
    const wish = await this.findOne({ where: { id: wishId } });

    const { name, description, image, link, price, copied } = wish;
    const wishCopy = {
      name,
      description,
      image,
      link,
      price,
      owner: { id: userId },
    };

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update<Wish>(Wish, wishId, {
        copied: copied + 1,
      });

      await queryRunner.manager.insert<Wish>(Wish, wishCopy);
      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }

    return {};
  }
}

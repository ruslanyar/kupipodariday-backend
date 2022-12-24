import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { HashService } from 'src/hash/hash.service';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await this.hashService.generate(createUserDto.password);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hash,
    });

    return this.userRepository.save(newUser);
  }

  findOne(query: FindOneOptions<User>) {
    return this.userRepository.findOne(query);
  }

  findMany(query: FindManyOptions<User>) {
    return this.userRepository.find(query);
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne({ where: { id } });

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashService.generate(
        updateUserDto.password,
      );
    }

    const updatedUser = { ...user, ...updateUserDto };
    return this.userRepository.update(id, updatedUser);
  }

  getUserWishes(query: FindOneOptions<User>) {
    return this.findOne(query).then((user) => user.wishes);
  }

  removeOne(id: number) {
    return `This action removes a #${id} user`;
  }
}

import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HashService } from 'src/hash/hash.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;

  const repository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  const mockedCreateUser: CreateUserDto = {
    username: 'name',
    about: 'about',
    avatar: 'avatar',
    email: 'email',
    password: 'pass',
  };

  const mockedUser: User = {
    id: 1,
    about: 'about',
    avatar: 'avatar',
    createdAt: new Date(),
    email: 'email',
    offers: [],
    password: 'password',
    updatedAt: new Date(),
    username: 'username',
    wishes: [],
    wishlists: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    })
      .useMocker((token) => {
        if (token === getRepositoryToken(User)) {
          return repository;
        }

        if (token === HashService) {
          return {
            generate: jest.fn(() => 'password'),
          };
        }
      })
      .compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('when create a new user', () => {
    describe('and user with passed username or email is already exist', () => {
      beforeEach(() => {
        repository.findOne.mockReturnValue(true);
      });

      it('should throw a Conflict exception', () => {
        expect(usersService.create(mockedCreateUser)).rejects.toThrow(
          ConflictException,
        );
      });
    });

    describe('with correct data', () => {
      it('should return a new User instance', async () => {
        repository.findOne.mockReturnValue(false);
        repository.save.mockReturnValue(mockedUser);
        expect(await usersService.create(mockedCreateUser)).toEqual(mockedUser);
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
  });
});

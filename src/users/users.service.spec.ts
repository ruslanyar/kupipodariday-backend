import { ConflictException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';

import { CreateUserDto } from './dto/create-user.dto';
import { HashService } from '../hash/hash.service';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

type SpyInstance = jest.SpyInstance;

describe('UsersService', () => {
  const mockedUserRepository = {
    // find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    // update: jest.fn(),
  };

  const mockedHashService = {
    generate: jest.fn(),
  };

  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockedUserRepository },
        { provide: HashService, useValue: mockedHashService },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('when create a new user', () => {
    const createUserDto = plainToInstance(CreateUserDto, {
      username: 'test-username',
      email: 'test-email',
      password: 'test-password',
    });

    const user = plainToInstance(User, {
      username: 'test-username',
      email: 'test-email',
      password: 'hashed-password',
    });

    let repoFindOneSpy: SpyInstance;
    let repoCreateSpy: SpyInstance;
    let repoSaveSpy: SpyInstance;
    let hashGenerateSpy: SpyInstance;

    beforeEach(() => {
      repoFindOneSpy = jest.spyOn(mockedUserRepository, 'findOne');
      repoCreateSpy = jest.spyOn(mockedUserRepository, 'create');
      repoSaveSpy = jest.spyOn(mockedUserRepository, 'save');
      hashGenerateSpy = jest.spyOn(mockedHashService, 'generate');
    });

    it('should return a new User instance', async () => {
      repoFindOneSpy.mockResolvedValue(null);
      hashGenerateSpy.mockResolvedValue('hashed-password');
      repoCreateSpy.mockReturnValue(user);
      repoSaveSpy.mockResolvedValue(user);

      expect(await usersService.create(createUserDto)).toEqual(user);

      expect(repoFindOneSpy).toHaveBeenNthCalledWith(1, {
        where: [
          { email: createUserDto.email },
          { username: createUserDto.username },
        ],
      });

      expect(hashGenerateSpy).toHaveBeenNthCalledWith(
        1,
        createUserDto.password,
      );

      expect(repoCreateSpy).toHaveBeenNthCalledWith(1, {
        username: 'test-username',
        email: 'test-email',
        password: 'hashed-password',
      });

      expect(repoSaveSpy).toHaveBeenNthCalledWith(1, user);
    });

    it('should throw exception on unique username or email conflict', () => {
      repoFindOneSpy.mockResolvedValue(user);

      expect(usersService.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );

      expect(repoFindOneSpy).toHaveBeenNthCalledWith(1, {
        where: [
          { email: createUserDto.email },
          { username: createUserDto.username },
        ],
      });

      expect(hashGenerateSpy).not.toHaveBeenCalled();
      expect(repoCreateSpy).not.toHaveBeenCalled();
      expect(repoSaveSpy).not.toHaveBeenCalled();
    });
  });
});

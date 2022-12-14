import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import configuration from '../configuration';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...configuration,
      entities: [],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}

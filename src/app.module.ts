import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import configuration from '../configuration';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...configuration,
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
  ],
})
export class AppModule {}

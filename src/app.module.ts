import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import configuration from '../configuration';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...configuration,
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

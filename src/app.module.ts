import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';

import config from '../config';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongodb),
    CacheModule.register(),
    EventEmitterModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

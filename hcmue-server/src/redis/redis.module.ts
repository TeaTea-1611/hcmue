import { Module } from '@nestjs/common';
import { redisProvider } from './redis.provider';
import { REDIS } from './redis.constant';

@Module({
  providers: [redisProvider],
  exports: [REDIS],
})
export class RedisModule {}

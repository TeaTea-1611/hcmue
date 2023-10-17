import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { REDIS } from './redis.constant';

export type RedisClient = Redis;

export const redisProvider: Provider = {
  useFactory: (configService: ConfigService): RedisClient => {
    return new Redis({
      host: configService.get('redis_host'),
      port: configService.get('redis_port'),
      db: configService.get('redis_db'),
      username: configService.get('redis_username'),
      password: configService.get('redis_password'),
    });
  },
  provide: REDIS,
  inject: [ConfigService],
};

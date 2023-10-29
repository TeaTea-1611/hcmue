import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: configService.get('db_username'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        logging: true,
        synchronize: true,
        entities: ['../**/entities/*.entity.js'],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

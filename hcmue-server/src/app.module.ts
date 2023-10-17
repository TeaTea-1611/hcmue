import { Inject, Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { DatabaseModule } from './database/database.module';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { LecturersModule } from './lecturers/lecturers.module';
import * as session from 'express-session';
import RedisStore from 'connect-redis';
import { RedisModule } from './redis/redis.module';
import { RedisClient } from './redis/redis.provider';
import { REDIS } from './redis/redis.constant';
import { UsersModule } from './users/users.module';
import * as passport from 'passport';
import { COOKIE_NAME } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
    RedisModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      playground: false,
      context: ({ req, res }) => ({ req, res }),
      plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
      formatError: (error) => {
        return error;
      },
    }),
    NewsModule,
    AuthModule,
    StudentsModule,
    LecturersModule,
    UsersModule,
  ],
})
export class AppModule implements NestModule {
  constructor(
    @Inject(REDIS)
    private readonly redis: RedisClient,
    private readonly configService: ConfigService,
  ) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          name: COOKIE_NAME,
          store: new RedisStore({ client: this.redis }),
          saveUninitialized: false,
          secret: this.configService.get('session_secret'),
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 1000 * 60 * 60, // 1h
          },
        }),
        passport.initialize(),
        passport.session(),
      )

      .forRoutes('*');
  }
}

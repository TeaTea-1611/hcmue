import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GraphQLError } from 'graphql';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
  });

  const configService = app.get(ConfigService);
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        return new GraphQLError('Validation failed', {
          extensions: {
            code: 'VALIDATION_ERROR',
            errors: errors.reduce(
              (accumulatedErrorsObj, error) => ({
                ...accumulatedErrorsObj,
                [error.property]: Object.values(error.constraints).join(' '),
              }),
              {},
            ),
          },
        });
      },
    }),
  );

  await app.listen(configService.get('port'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

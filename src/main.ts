import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Validation } from './common/validation.pipe';
import { GraphqlExceptionFilter } from './common/graphql-exception.filter';

async function bootstrap() {
  const logger = new Logger('InitApplication')
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new Validation());
  //app.useGlobalFilters(new HttpExceptionFilter());
  const ENVIRONMENT: string = process.env.NODE_ENV;
  let configPath;
  switch(ENVIRONMENT){
    case 'TEST':
    case 'TESTING': configPath = path.resolve(__dirname,'..', 'test.env'); break;
    case 'PROD':
    case 'PRODUCTION': configPath = path.resolve(__dirname, '..', 'prod.env'); break;
    default: configPath = path.resolve(__dirname, '..', 'dev.env'); break;
  }
  dotenv.config({ path: configPath });
  const PORT = process.env.PORT
  await app.listen(PORT);
  logger.log(`App init in http://localhost:${PORT}`)
}
bootstrap();

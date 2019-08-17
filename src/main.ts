import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('InitApplication')
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const ENVIRONMENT: string = process.env.NODE_ENV;
  switch(ENVIRONMENT){
    case 'TEST':
    case 'TESTING': dotenv.config({ path: path.resolve(__dirname,'..', 'test.env') }); break;
    case 'PROD':
    case 'PRODUCTION': dotenv.config({ path: path.resolve(__dirname, '..', 'prod.env') });
    default: dotenv.config({ path: path.resolve(__dirname, '..', 'dev.env') }); break;
  }
  const PORT = process.env.PORT
  await app.listen(PORT);
  logger.log(`App init in http://localhost:${PORT}`)
}
bootstrap();

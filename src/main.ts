import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Env from '../types/Env';

async function bootstrap() {
  require('dotenv').config();
  const env: Env = process.env;

  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(env.APP_PORT);
}
bootstrap();

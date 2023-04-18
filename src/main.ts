import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  require('dotenv').config();
  const env = process.env;

  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(env.APP_PORT);
}
bootstrap();

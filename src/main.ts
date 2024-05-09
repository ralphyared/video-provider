import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import config from './global/config';

async function bootstrap() {
  const port = config().portConfig.port;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
  });
}
bootstrap();

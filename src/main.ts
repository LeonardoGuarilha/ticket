import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const porta = 3000;
  await app.listen(porta);
  logger.log(`Aplicação rodando na porta ${porta}`);
}
bootstrap();

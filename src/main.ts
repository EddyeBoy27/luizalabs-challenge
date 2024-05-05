import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

const PORT = parseInt(process.env.SERVER_PORT, 10 || 3000);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,POST,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: false,
    maxAge: 3600,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(helmet());

  await app.listen(PORT);

  Logger.log(`Server running on https://localhost:${PORT}`, 'Boostrap');
}
bootstrap();

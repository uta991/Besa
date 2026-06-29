import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // allow the Next.js frontend to call the API in dev
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN?.split(',') ?? [
      'http://localhost:3000',
      'http://localhost:3100',
    ],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  const port = process.env.PORT ? Number(process.env.PORT) : 4000;
  await app.listen(port);
  console.log(`🚀 Besa API running on http://localhost:${port}/api`);
}
void bootstrap();

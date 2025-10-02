import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as dotenv from 'dotenv';
import { NextFunction } from 'express';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  const port = process.env.PORT ? Number(process.env.PORT) : 4000;
  // app.use((req: Request, res: Response, next: NextFunction) => {
  //   console.log('📥 Incoming request:', req.method, req.url);
  //   next();
  // });
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${port}`);
}

bootstrap();



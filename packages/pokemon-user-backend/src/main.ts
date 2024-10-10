/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { startDatabase } from './modules/database/db';
import { AppModule } from './modules/app/app.module';
import { StartupService } from "./modules/startup.service";

async function bootstrap() {
  process.on('uncaughtException', (error) => {
    console.error(error);
    process.exit();
  });

  await startDatabase();
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.enableCors({
    origin: 'http://localhost:4200',
  });
  app.setGlobalPrefix(globalPrefix);
  const port = 3000;
  // const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

  const startupService = app.get(StartupService);
  startupService.runOnStartup();
}

bootstrap();

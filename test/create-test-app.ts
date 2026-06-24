import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/core/configure-app';
import { PrismaService } from '../src/core/database/prisma.service';

export interface TestApp {
  app: INestApplication;
  prisma: PrismaService;
}

// Boots the real application (same wiring as production) for e2e tests.
export async function createTestApp(): Promise<TestApp> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();
  configureApp(app);
  await app.init();

  return { app, prisma: app.get(PrismaService) };
}

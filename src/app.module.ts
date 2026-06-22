import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './core/config/env.validation';
import { PrismaModule } from './core/database/prisma.module';
import { HealthModule } from './modules/health/health.module';
import { AdminPortfolioModule } from './modules/portfolio/admin-portfolio.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnv,
    }),
    PrismaModule,
    HealthModule,
    PortfolioModule,
    AdminPortfolioModule,
  ],
})
export class AppModule {}

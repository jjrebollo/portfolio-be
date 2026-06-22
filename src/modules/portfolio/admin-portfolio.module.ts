import { Module } from '@nestjs/common';
import { ApiKeyGuard } from '../../core/security/api-key.guard';
import { GetDraftUseCase } from './application/use-cases/get-draft.use-case';
import { PublishPortfolioUseCase } from './application/use-cases/publish-portfolio.use-case';
import { SaveDraftUseCase } from './application/use-cases/save-draft.use-case';
import { PortfolioModule } from './portfolio.module';
import { AdminPortfolioController } from './presentation/http/admin-portfolio.controller';

@Module({
  imports: [PortfolioModule],
  controllers: [AdminPortfolioController],
  providers: [
    SaveDraftUseCase,
    GetDraftUseCase,
    PublishPortfolioUseCase,
    ApiKeyGuard,
  ],
})
export class AdminPortfolioModule {}

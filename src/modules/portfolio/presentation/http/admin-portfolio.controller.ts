import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ApiKeyGuard } from '../../../../core/security/api-key.guard';
import { GetDraftUseCase } from '../../application/use-cases/get-draft.use-case';
import { PublishPortfolioUseCase } from '../../application/use-cases/publish-portfolio.use-case';
import { SaveDraftUseCase } from '../../application/use-cases/save-draft.use-case';
import { AdminLocaleParamDto } from './dto/admin-locale-param.dto';

@ApiTags('admin-portfolio')
@ApiSecurity('api-key')
@ApiHeader({
  name: 'x-api-key',
  required: true,
  description: 'Admin API key.',
})
@UseGuards(ApiKeyGuard)
@Controller('admin/portfolio')
export class AdminPortfolioController {
  constructor(
    private readonly saveDraftUseCase: SaveDraftUseCase,
    private readonly getDraftUseCase: GetDraftUseCase,
    private readonly publishPortfolioUseCase: PublishPortfolioUseCase,
  ) {}

  @Put(':locale/draft')
  @ApiOkResponse({ description: 'The saved draft snapshot.' })
  saveDraft(
    @Param() params: AdminLocaleParamDto,
    @Body() payload: unknown,
  ) {
    return this.saveDraftUseCase.execute(params.locale, payload);
  }

  @Get(':locale/draft')
  @ApiOkResponse({ description: 'The current draft snapshot.' })
  getDraft(@Param() params: AdminLocaleParamDto) {
    return this.getDraftUseCase.execute(params.locale);
  }

  @Post(':locale/publish')
  @ApiOkResponse({ description: 'The published snapshot.' })
  publish(@Param() params: AdminLocaleParamDto) {
    return this.publishPortfolioUseCase.execute(params.locale);
  }
}

import { Controller, Get } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetPublishedPortfolioUseCase } from '../../application/use-cases/get-published-portfolio.use-case';
import { ListPublishedLocalesUseCase } from '../../application/use-cases/list-published-locales.use-case';
import { SUPPORTED_LOCALES } from '../../domain/portfolio.types';
import type { SupportedLocale } from '../../domain/portfolio.types';
import { AcceptLanguage } from './decorators/accept-language.decorator';

@ApiTags('portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(
    private readonly getPublishedPortfolioUseCase: GetPublishedPortfolioUseCase,
    private readonly listPublishedLocalesUseCase: ListPublishedLocalesUseCase,
  ) {}

  @Get('locales')
  @ApiOkResponse({
    schema: {
      example: {
        items: SUPPORTED_LOCALES,
      },
    },
  })
  listLocales() {
    return this.listPublishedLocalesUseCase.execute();
  }

  @Get()
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description:
      'Preferred locale (en, es, pt). Defaults to en when missing or unsupported.',
  })
  @ApiOkResponse({
    description: 'Published portfolio content for the requested locale.',
  })
  getPortfolio(@AcceptLanguage() locale: SupportedLocale) {
    return this.getPublishedPortfolioUseCase.execute(locale);
  }
}
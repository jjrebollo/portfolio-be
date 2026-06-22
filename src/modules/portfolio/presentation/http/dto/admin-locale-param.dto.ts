import { IsIn } from 'class-validator';
import { SUPPORTED_LOCALES } from '../../../domain/portfolio.types';
import type { SupportedLocale } from '../../../domain/portfolio.types';

export class AdminLocaleParamDto {
  @IsIn(SUPPORTED_LOCALES as unknown as string[], {
    message: `locale must be one of: ${SUPPORTED_LOCALES.join(', ')}`,
  })
  locale!: SupportedLocale;
}

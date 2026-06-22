import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { resolveLocaleFromAcceptLanguage } from '../../../domain/portfolio.types';
import type { SupportedLocale } from '../../../domain/portfolio.types';

type RequestWithHeaders = {
  headers: Record<string, string | string[] | undefined>;
};

export const AcceptLanguage = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): SupportedLocale => {
    const request = ctx.switchToHttp().getRequest<RequestWithHeaders>();
    const header = request.headers['accept-language'];

    return resolveLocaleFromAcceptLanguage(
      Array.isArray(header) ? header[0] : header,
    );
  },
);

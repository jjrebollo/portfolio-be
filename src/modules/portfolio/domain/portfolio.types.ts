export const SUPPORTED_LOCALES = ['en', 'es', 'pt'] as const;

export const DEFAULT_LOCALE: SupportedLocale = 'en';

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const SNAPSHOT_STATUSES = ['DRAFT', 'PUBLISHED'] as const;

export type SnapshotStatus = (typeof SNAPSHOT_STATUSES)[number];

export interface PortfolioLocaleDocument {
  schemaVersion: number;
  siteMeta: Record<string, unknown>;
  navigationLinks: ReadonlyArray<Record<string, unknown>>;
  siteContent: Record<string, unknown>;
}

export interface PortfolioSnapshot {
  locale: SupportedLocale;
  status: SnapshotStatus;
  payload: PortfolioLocaleDocument;
  publishedAt: Date | null;
  updatedAt: Date;
}

export interface PortfolioPublication {
  locale: SupportedLocale;
  version: number;
  payload: PortfolioLocaleDocument;
  publishedAt: Date;
}

export interface PortfolioPublicationSummary {
  version: number;
  publishedAt: Date;
}

export function isSupportedLocale(value: string): value is SupportedLocale {
  return SUPPORTED_LOCALES.includes(value as SupportedLocale);
}

/**
 * Resolves the best supported locale from an `Accept-Language` header value.
 * Falls back to {@link DEFAULT_LOCALE} when the header is missing or contains
 * no supported language tag.
 */
export function resolveLocaleFromAcceptLanguage(
  header: string | undefined,
): SupportedLocale {
  if (!header) {
    return DEFAULT_LOCALE;
  }

  const rankedLocales = header
    .split(',')
    .map((part) => {
      const [tag, ...directives] = part.trim().split(';');
      const qualityDirective = directives
        .map((directive) => directive.trim())
        .find((directive) => directive.startsWith('q='));
      const quality = qualityDirective
        ? Number.parseFloat(qualityDirective.slice(2))
        : 1;

      return {
        locale: tag.trim().toLowerCase().split('-')[0],
        quality: Number.isNaN(quality) ? 0 : quality,
      };
    })
    .filter((entry) => entry.locale.length > 0)
    .sort((a, b) => b.quality - a.quality);

  const match = rankedLocales.find((entry) => isSupportedLocale(entry.locale));

  return match ? (match.locale as SupportedLocale) : DEFAULT_LOCALE;
}

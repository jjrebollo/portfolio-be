import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  isSupportedLocale,
  resolveLocaleFromAcceptLanguage,
} from './portfolio.types';

describe('isSupportedLocale', () => {
  it.each(SUPPORTED_LOCALES)('returns true for "%s"', (locale) => {
    expect(isSupportedLocale(locale)).toBe(true);
  });

  it.each(['fr', 'de', 'EN', ''])('returns false for "%s"', (value) => {
    expect(isSupportedLocale(value)).toBe(false);
  });
});

describe('resolveLocaleFromAcceptLanguage', () => {
  it('falls back to the default when the header is missing', () => {
    expect(resolveLocaleFromAcceptLanguage(undefined)).toBe(DEFAULT_LOCALE);
  });

  it('falls back to the default when the header is empty', () => {
    expect(resolveLocaleFromAcceptLanguage('')).toBe(DEFAULT_LOCALE);
  });

  it('resolves a simple language tag', () => {
    expect(resolveLocaleFromAcceptLanguage('es')).toBe('es');
  });

  it('strips region subtags', () => {
    expect(resolveLocaleFromAcceptLanguage('pt-BR')).toBe('pt');
  });

  it('is case-insensitive', () => {
    expect(resolveLocaleFromAcceptLanguage('ES')).toBe('es');
  });

  it('skips unsupported languages and picks the next by quality', () => {
    expect(resolveLocaleFromAcceptLanguage('fr;q=0.9, es;q=0.8')).toBe('es');
  });

  it('honours quality weights over order', () => {
    expect(resolveLocaleFromAcceptLanguage('en;q=0.3, es;q=0.9')).toBe('es');
  });

  it('defaults an omitted quality to 1', () => {
    expect(resolveLocaleFromAcceptLanguage('pt, es;q=0.9')).toBe('pt');
  });

  it('treats a malformed quality as zero', () => {
    expect(resolveLocaleFromAcceptLanguage('es;q=abc, pt')).toBe('pt');
  });

  it('ignores empty segments', () => {
    expect(resolveLocaleFromAcceptLanguage(',, es ,')).toBe('es');
  });

  it('falls back to the default when no supported language is present', () => {
    expect(resolveLocaleFromAcceptLanguage('fr, de')).toBe(DEFAULT_LOCALE);
  });
});

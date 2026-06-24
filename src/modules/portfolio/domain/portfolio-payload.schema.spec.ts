import {
  PORTFOLIO_SCHEMA_VERSION,
  parsePortfolioPayload,
} from './portfolio-payload.schema';

const validPayload = {
  schemaVersion: 1,
  siteMeta: { lang: 'en', title: 'Title' },
  navigationLinks: [{ label: 'Skills', href: '/#skills' }],
  siteContent: { hero: { title: 'Hi' } },
};

describe('parsePortfolioPayload', () => {
  it('exposes the current schema version', () => {
    expect(PORTFOLIO_SCHEMA_VERSION).toBe(1);
  });

  it('accepts a valid payload', () => {
    expect(parsePortfolioPayload(validPayload)).toMatchObject(validPayload);
  });

  it('defaults schemaVersion when omitted', () => {
    const { schemaVersion: _omitted, ...withoutVersion } = validPayload;

    expect(parsePortfolioPayload(withoutVersion).schemaVersion).toBe(
      PORTFOLIO_SCHEMA_VERSION,
    );
  });

  it('rejects an unsupported schemaVersion', () => {
    expect(() =>
      parsePortfolioPayload({ ...validPayload, schemaVersion: 2 }),
    ).toThrow();
  });

  it('keeps unknown nested keys (passthrough)', () => {
    const parsed = parsePortfolioPayload({
      ...validPayload,
      siteMeta: { lang: 'en', title: 'T', extra: 'kept' },
    });

    expect((parsed.siteMeta as Record<string, unknown>).extra).toBe('kept');
  });

  it('strips unknown top-level keys', () => {
    const parsed = parsePortfolioPayload({
      ...validPayload,
      locale: 'en',
      status: 'DRAFT',
      updatedAt: 'whenever',
    });

    expect((parsed as Record<string, unknown>).locale).toBeUndefined();
    expect((parsed as Record<string, unknown>).status).toBeUndefined();
  });

  it('requires siteMeta.lang and siteMeta.title', () => {
    expect(() =>
      parsePortfolioPayload({ ...validPayload, siteMeta: { lang: 'en' } }),
    ).toThrow();
    expect(() =>
      parsePortfolioPayload({ ...validPayload, siteMeta: { title: 'T' } }),
    ).toThrow();
  });

  it('rejects empty strings in siteMeta', () => {
    expect(() =>
      parsePortfolioPayload({
        ...validPayload,
        siteMeta: { lang: '', title: 'T' },
      }),
    ).toThrow();
  });

  it('requires navigationLinks items to have a label and href', () => {
    expect(() =>
      parsePortfolioPayload({
        ...validPayload,
        navigationLinks: [{ label: 'Skills' }],
      }),
    ).toThrow();
  });

  it.each([null, undefined, 'nope', 42, []])(
    'rejects a non-object payload (%p)',
    (payload) => {
      expect(() => parsePortfolioPayload(payload)).toThrow();
    },
  );
});

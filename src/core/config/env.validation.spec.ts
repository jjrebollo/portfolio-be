import { validateEnv } from './env.validation';

describe('validateEnv', () => {
  const base = { DATABASE_URL: 'postgresql://user:pass@localhost:5432/db' };

  it('applies defaults for NODE_ENV and PORT', () => {
    const env = validateEnv({ ...base });

    expect(env.NODE_ENV).toBe('development');
    expect(env.PORT).toBe(3000);
    expect(env.DATABASE_URL).toBe(base.DATABASE_URL);
    expect(env.ADMIN_API_KEY).toBeUndefined();
  });

  it('coerces a string PORT to a number', () => {
    expect(validateEnv({ ...base, PORT: '8080' }).PORT).toBe(8080);
  });

  it.each(['development', 'test', 'production'])(
    'accepts NODE_ENV "%s"',
    (value) => {
      expect(validateEnv({ ...base, NODE_ENV: value }).NODE_ENV).toBe(value);
    },
  );

  it('passes ADMIN_API_KEY through when provided', () => {
    expect(
      validateEnv({ ...base, ADMIN_API_KEY: 'secret' }).ADMIN_API_KEY,
    ).toBe('secret');
  });

  it('throws when DATABASE_URL is missing', () => {
    expect(() => validateEnv({})).toThrow();
  });

  it('throws when DATABASE_URL is empty', () => {
    expect(() => validateEnv({ DATABASE_URL: '' })).toThrow();
  });

  it('throws on an unknown NODE_ENV', () => {
    expect(() => validateEnv({ ...base, NODE_ENV: 'staging' })).toThrow();
  });

  it.each(['-1', '0', 'abc', '3.5'])(
    'throws when PORT is not a positive integer ("%s")',
    (port) => {
      expect(() => validateEnv({ ...base, PORT: port })).toThrow();
    },
  );

  it('rejects an empty ADMIN_API_KEY', () => {
    expect(() => validateEnv({ ...base, ADMIN_API_KEY: '' })).toThrow();
  });
});

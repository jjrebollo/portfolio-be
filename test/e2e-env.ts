// Resolved once and shared by the e2e setup files. The runner (CI) can override
// via DATABASE_URL / ADMIN_API_KEY; locally it defaults to an isolated test
// database so e2e runs never touch development data.
export const TEST_DATABASE_URL =
  process.env.DATABASE_URL ??
  'postgresql://portfolio:portfolio@localhost:5432/portfolio_test?schema=public';

export const E2E_ADMIN_API_KEY = process.env.ADMIN_API_KEY ?? 'e2e-admin-key';

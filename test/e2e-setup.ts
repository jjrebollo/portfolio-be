import { E2E_ADMIN_API_KEY, TEST_DATABASE_URL } from './e2e-env';

// Runs in each worker before the app boots, so ConfigModule and PrismaClient
// pick up the test database and admin key.
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = TEST_DATABASE_URL;
process.env.ADMIN_API_KEY = E2E_ADMIN_API_KEY;

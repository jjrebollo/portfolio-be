import { execSync } from 'node:child_process';
import { TEST_DATABASE_URL } from './e2e-env';

// Runs once before the e2e suites: applies migrations to the test database so
// its schema matches production.
export default function globalSetup(): void {
  execSync('npx prisma migrate deploy', {
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: TEST_DATABASE_URL },
  });
}

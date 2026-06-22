import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  ADMIN_API_KEY: z.string().min(1).optional(),
});

export type AppEnvironment = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): AppEnvironment {
  return envSchema.parse(config);
}
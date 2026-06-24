import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiKeyGuard } from './api-key.guard';

function createContext(headerValue?: string): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({
        header: (name: string) =>
          name === 'x-api-key' ? headerValue : undefined,
      }),
    }),
  } as unknown as ExecutionContext;
}

function guardWith(configuredKey?: string): {
  guard: ApiKeyGuard;
  config: ConfigService;
} {
  const config = {
    get: jest.fn().mockReturnValue(configuredKey),
  } as unknown as ConfigService;
  return { guard: new ApiKeyGuard(config), config };
}

describe('ApiKeyGuard', () => {
  it('fails closed when no ADMIN_API_KEY is configured', () => {
    const { guard } = guardWith(undefined);

    expect(() => guard.canActivate(createContext('anything'))).toThrow(
      UnauthorizedException,
    );
    expect(() => guard.canActivate(createContext('anything'))).toThrow(
      'Admin API is not configured.',
    );
  });

  it('rejects a missing key header', () => {
    const { guard } = guardWith('secret');

    expect(() => guard.canActivate(createContext(undefined))).toThrow(
      'Invalid API key.',
    );
  });

  it('rejects a non-matching key', () => {
    const { guard } = guardWith('secret');

    expect(() => guard.canActivate(createContext('wrong'))).toThrow(
      'Invalid API key.',
    );
  });

  it('allows a matching key', () => {
    const { guard } = guardWith('secret');

    expect(guard.canActivate(createContext('secret'))).toBe(true);
  });

  it('reads the configured key from ADMIN_API_KEY', () => {
    const { guard, config } = guardWith('secret');

    guard.canActivate(createContext('secret'));

    expect(config.get).toHaveBeenCalledWith('ADMIN_API_KEY');
  });
});

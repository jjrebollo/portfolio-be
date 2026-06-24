import { ArgumentsHost } from '@nestjs/common';
import { ZodError, z } from 'zod';
import { ZodExceptionFilter } from './zod-exception.filter';

function createHost(): {
  host: ArgumentsHost;
  status: jest.Mock;
  json: jest.Mock;
} {
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  const host = {
    switchToHttp: () => ({ getResponse: () => ({ status }) }),
  } as unknown as ArgumentsHost;
  return { host, status, json };
}

function errorFrom(parse: () => unknown): ZodError {
  try {
    parse();
  } catch (error) {
    return error as ZodError;
  }
  throw new Error('expected a ZodError to be thrown');
}

describe('ZodExceptionFilter', () => {
  it('maps a ZodError to a 400 response with flattened issues', () => {
    const filter = new ZodExceptionFilter();
    const { host, status, json } = createHost();
    const error = errorFrom(() =>
      z.object({ name: z.string() }).parse({ name: 1 }),
    );

    filter.catch(error, host);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Payload validation failed.',
        issues: expect.arrayContaining([
          expect.objectContaining({
            path: 'name',
            message: expect.any(String),
          }),
        ]),
      }),
    );
  });

  it('joins nested issue paths with dots', () => {
    const filter = new ZodExceptionFilter();
    const { host, json } = createHost();
    const error = errorFrom(() =>
      z.object({ a: z.object({ b: z.string() }) }).parse({ a: { b: 1 } }),
    );

    filter.catch(error, host);

    expect(json.mock.calls[0][0].issues[0].path).toBe('a.b');
  });
});

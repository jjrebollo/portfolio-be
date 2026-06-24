import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { API_PREFIX, configureApp } from './configure-app';

jest.mock('@nestjs/swagger', () => {
  const actual = jest.requireActual('@nestjs/swagger');
  return {
    ...actual,
    SwaggerModule: {
      createDocument: jest.fn().mockReturnValue({ openapi: '3.0.0' }),
      setup: jest.fn(),
    },
  };
});

describe('configureApp', () => {
  it('configures cors, global prefix, pipes, filters and swagger', () => {
    const app = {
      enableCors: jest.fn(),
      setGlobalPrefix: jest.fn(),
      useGlobalPipes: jest.fn(),
      useGlobalFilters: jest.fn(),
    } as unknown as INestApplication;

    configureApp(app);

    expect(app.enableCors).toHaveBeenCalledTimes(1);
    expect(app.setGlobalPrefix).toHaveBeenCalledWith(API_PREFIX);
    expect(app.useGlobalPipes).toHaveBeenCalledTimes(1);
    expect(app.useGlobalFilters).toHaveBeenCalledTimes(1);
    expect(SwaggerModule.createDocument).toHaveBeenCalledTimes(1);
    expect(SwaggerModule.setup).toHaveBeenCalledWith(
      'docs',
      app,
      expect.anything(),
    );
  });
});

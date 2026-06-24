import 'reflect-metadata';
import { ExecutionContext } from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { AcceptLanguage } from './accept-language.decorator';

type ParamFactory = (data: unknown, ctx: ExecutionContext) => unknown;

// createParamDecorator hides its factory; extract it via the metadata it writes.
function getParamFactory(decorator: () => ParameterDecorator): ParamFactory {
  class Probe {
    handler(@decorator() _value: unknown): void {}
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Probe, 'handler');
  return args[Object.keys(args)[0]].factory as ParamFactory;
}

function contextWith(header?: string | string[]): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ headers: { 'accept-language': header } }),
    }),
  } as unknown as ExecutionContext;
}

describe('AcceptLanguage decorator', () => {
  const factory = getParamFactory(AcceptLanguage);

  it('resolves the locale from the Accept-Language header', () => {
    expect(factory(undefined, contextWith('es'))).toBe('es');
  });

  it('defaults to en when the header is missing', () => {
    expect(factory(undefined, contextWith(undefined))).toBe('en');
  });

  it('uses the first value when the header is an array', () => {
    expect(factory(undefined, contextWith(['pt-BR', 'en']))).toBe('pt');
  });
});

import { HealthController } from './health.controller';

describe('HealthController', () => {
  it('reports an ok status', () => {
    expect(new HealthController().getHealth()).toEqual({
      status: 'ok',
      service: 'portfolio-be',
    });
  });
});

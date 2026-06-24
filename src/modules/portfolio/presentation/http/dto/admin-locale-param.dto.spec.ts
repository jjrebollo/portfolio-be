import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { AdminLocaleParamDto } from './admin-locale-param.dto';

function validate(locale: string) {
  return validateSync(plainToInstance(AdminLocaleParamDto, { locale }));
}

describe('AdminLocaleParamDto', () => {
  it.each(['en', 'es', 'pt'])('accepts the supported locale "%s"', (locale) => {
    expect(validate(locale)).toHaveLength(0);
  });

  it.each(['fr', 'EN', 'english', ''])(
    'rejects the unsupported locale "%s"',
    (locale) => {
      const errors = validate(locale);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints?.isIn).toContain('locale must be one of');
    },
  );
});

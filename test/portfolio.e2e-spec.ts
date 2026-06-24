import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaService } from '../src/core/database/prisma.service';
import { createTestApp } from './create-test-app';

function payload(lang: string) {
  return {
    schemaVersion: 1,
    siteMeta: { lang, title: `Title ${lang}` },
    navigationLinks: [{ label: 'Skills', href: '/#skills' }],
    siteContent: { hero: { title: 'Hi' } },
  };
}

describe('Public portfolio (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    ({ app, prisma } = await createTestApp());
  });

  afterAll(async () => {
    await prisma.portfolioSnapshot.deleteMany();
    await app.close();
  });

  beforeEach(async () => {
    await prisma.portfolioSnapshot.deleteMany();
    await prisma.portfolioSnapshot.createMany({
      data: [
        {
          locale: 'en',
          status: 'PUBLISHED',
          payload: payload('en'),
          publishedAt: new Date(),
        },
        {
          locale: 'es',
          status: 'PUBLISHED',
          payload: payload('es'),
          publishedAt: new Date(),
        },
        // A draft must never surface through the public API.
        {
          locale: 'pt',
          status: 'DRAFT',
          payload: payload('pt'),
          publishedAt: null,
        },
      ],
    });
  });

  const server = () => app.getHttpServer();

  it('lists only published locales, sorted', async () => {
    const res = await request(server())
      .get('/api/v1/portfolio/locales')
      .expect(200);

    expect(res.body).toEqual({ items: ['en', 'es'] });
  });

  it('resolves the locale from Accept-Language', async () => {
    const res = await request(server())
      .get('/api/v1/portfolio')
      .set('Accept-Language', 'es')
      .expect(200);

    expect(res.body).toMatchObject({ locale: 'es', status: 'PUBLISHED' });
    expect(res.body.siteMeta.lang).toBe('es');
  });

  it('defaults to en when Accept-Language is missing', async () => {
    const res = await request(server()).get('/api/v1/portfolio').expect(200);

    expect(res.body.locale).toBe('en');
  });

  it('returns 404 for a locale without published content', () =>
    request(server())
      .get('/api/v1/portfolio')
      .set('Accept-Language', 'pt')
      .expect(404));
});

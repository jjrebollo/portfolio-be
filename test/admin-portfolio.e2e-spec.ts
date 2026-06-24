import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaService } from '../src/core/database/prisma.service';
import { createTestApp } from './create-test-app';
import { E2E_ADMIN_API_KEY } from './e2e-env';

const validPayload = {
  schemaVersion: 1,
  siteMeta: { lang: 'en', title: 'Admin Title' },
  navigationLinks: [{ label: 'Skills', href: '/#skills' }],
  siteContent: { hero: { title: 'x' } },
};

describe('Admin portfolio (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const key = E2E_ADMIN_API_KEY;

  beforeAll(async () => {
    ({ app, prisma } = await createTestApp());
  });

  afterAll(async () => {
    await prisma.portfolioSnapshot.deleteMany();
    await app.close();
  });

  beforeEach(async () => {
    await prisma.portfolioSnapshot.deleteMany();
  });

  const server = () => app.getHttpServer();

  it('rejects a request without an API key (401)', () =>
    request(server()).get('/api/v1/admin/portfolio/en/draft').expect(401));

  it('rejects an invalid API key (401)', () =>
    request(server())
      .get('/api/v1/admin/portfolio/en/draft')
      .set('x-api-key', 'wrong')
      .expect(401));

  it('rejects an unsupported locale (400)', () =>
    request(server())
      .get('/api/v1/admin/portfolio/fr/draft')
      .set('x-api-key', key)
      .expect(400));

  it('returns 404 when no draft exists', () =>
    request(server())
      .get('/api/v1/admin/portfolio/en/draft')
      .set('x-api-key', key)
      .expect(404));

  it('rejects an invalid payload (400)', () =>
    request(server())
      .put('/api/v1/admin/portfolio/en/draft')
      .set('x-api-key', key)
      .send({ siteMeta: {} })
      .expect(400));

  it('returns 404 when publishing without a draft', () =>
    request(server())
      .post('/api/v1/admin/portfolio/en/publish')
      .set('x-api-key', key)
      .expect(404));

  it('supports the full draft -> publish lifecycle', async () => {
    const saved = await request(server())
      .put('/api/v1/admin/portfolio/en/draft')
      .set('x-api-key', key)
      .send(validPayload)
      .expect(200);
    expect(saved.body).toMatchObject({ locale: 'en', status: 'DRAFT' });
    expect(saved.body.publishedAt).toBeNull();

    const draft = await request(server())
      .get('/api/v1/admin/portfolio/en/draft')
      .set('x-api-key', key)
      .expect(200);
    expect(draft.body.status).toBe('DRAFT');
    expect(draft.body.siteMeta.title).toBe('Admin Title');

    // Not published yet -> invisible to the public API.
    await request(server())
      .get('/api/v1/portfolio')
      .set('Accept-Language', 'en')
      .expect(404);

    const published = await request(server())
      .post('/api/v1/admin/portfolio/en/publish')
      .set('x-api-key', key)
      .expect(200);
    expect(published.body).toMatchObject({ locale: 'en', status: 'PUBLISHED' });
    expect(published.body.publishedAt).not.toBeNull();

    // Now the public API serves it.
    const publicRes = await request(server())
      .get('/api/v1/portfolio')
      .set('Accept-Language', 'en')
      .expect(200);
    expect(publicRes.body).toMatchObject({ locale: 'en', status: 'PUBLISHED' });
  });
});

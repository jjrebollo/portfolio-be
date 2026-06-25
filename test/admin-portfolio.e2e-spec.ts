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
    await prisma.portfolioPublication.deleteMany();
    await prisma.portfolioSnapshot.deleteMany();
    await app.close();
  });

  beforeEach(async () => {
    await prisma.portfolioPublication.deleteMany();
    await prisma.portfolioSnapshot.deleteMany();
  });

  const server = () => app.getHttpServer();

  async function publishTitle(title: string) {
    await request(server())
      .put('/api/v1/admin/portfolio/en/draft')
      .set('x-api-key', key)
      .send({ ...validPayload, siteMeta: { lang: 'en', title } })
      .expect(200);
    await request(server())
      .post('/api/v1/admin/portfolio/en/publish')
      .set('x-api-key', key)
      .expect(200);
  }

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

  it('records a history version on each publish, newest first', async () => {
    await publishTitle('Version one');
    await publishTitle('Version two');

    const history = await request(server())
      .get('/api/v1/admin/portfolio/en/publications')
      .set('x-api-key', key)
      .expect(200);

    expect(history.body.items).toHaveLength(2);
    expect(
      history.body.items.map((i: { version: number }) => i.version),
    ).toEqual([2, 1]);
  });

  it('returns an empty history when nothing has been published', async () => {
    const history = await request(server())
      .get('/api/v1/admin/portfolio/en/publications')
      .set('x-api-key', key)
      .expect(200);

    expect(history.body).toEqual({ items: [] });
  });

  it('restores a prior version and appends a new history entry', async () => {
    await publishTitle('Version one');
    await publishTitle('Version two');

    // Live content is currently version two.
    const before = await request(server())
      .get('/api/v1/portfolio')
      .set('Accept-Language', 'en')
      .expect(200);
    expect(before.body.siteMeta.title).toBe('Version two');

    // Roll back to version one.
    const restored = await request(server())
      .post('/api/v1/admin/portfolio/en/publications/1/restore')
      .set('x-api-key', key)
      .expect(200);
    expect(restored.body).toMatchObject({ locale: 'en', status: 'PUBLISHED' });
    expect(restored.body.siteMeta.title).toBe('Version one');

    // Public content reflects the rolled-back version.
    const after = await request(server())
      .get('/api/v1/portfolio')
      .set('Accept-Language', 'en')
      .expect(200);
    expect(after.body.siteMeta.title).toBe('Version one');

    // The restore is itself recorded as version three (append-only history).
    const history = await request(server())
      .get('/api/v1/admin/portfolio/en/publications')
      .set('x-api-key', key)
      .expect(200);
    expect(
      history.body.items.map((i: { version: number }) => i.version),
    ).toEqual([3, 2, 1]);
  });

  it('returns 404 when restoring a non-existent version', () =>
    request(server())
      .post('/api/v1/admin/portfolio/en/publications/99/restore')
      .set('x-api-key', key)
      .expect(404));

  it('returns 400 when the version is not an integer', () =>
    request(server())
      .post('/api/v1/admin/portfolio/en/publications/abc/restore')
      .set('x-api-key', key)
      .expect(400));

  it('requires an API key for publication history (401)', () =>
    request(server())
      .get('/api/v1/admin/portfolio/en/publications')
      .expect(401));
});

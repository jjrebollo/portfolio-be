import { NotFoundException } from '@nestjs/common';
import {
  PortfolioReadRepository,
  PortfolioWriteRepository,
} from '../../domain/portfolio.repository';
import { PortfolioSnapshot } from '../../domain/portfolio.types';
import { PublishPortfolioUseCase } from './publish-portfolio.use-case';

const draft: PortfolioSnapshot = {
  locale: 'en',
  status: 'DRAFT',
  payload: {
    schemaVersion: 1,
    siteMeta: { lang: 'en', title: 'T' },
    navigationLinks: [],
    siteContent: {},
  },
  publishedAt: null,
  updatedAt: new Date('2026-01-01T00:00:00.000Z'),
};

const published: PortfolioSnapshot = {
  ...draft,
  status: 'PUBLISHED',
  publishedAt: new Date('2026-01-02T00:00:00.000Z'),
};

describe('PublishPortfolioUseCase', () => {
  it('publishes an existing draft', async () => {
    const read = {
      findByLocaleAndStatus: jest.fn().mockResolvedValue(draft),
    } as unknown as PortfolioReadRepository;
    const write = {
      publish: jest.fn().mockResolvedValue(published),
    } as unknown as PortfolioWriteRepository;

    const result = await new PublishPortfolioUseCase(read, write).execute('en');

    expect(read.findByLocaleAndStatus).toHaveBeenCalledWith('en', 'DRAFT');
    expect(write.publish).toHaveBeenCalledWith(
      'en',
      expect.objectContaining({ schemaVersion: 1 }),
    );
    expect(result.status).toBe('PUBLISHED');
  });

  it('throws NotFound and does not write when there is no draft', async () => {
    const read = {
      findByLocaleAndStatus: jest.fn().mockResolvedValue(null),
    } as unknown as PortfolioReadRepository;
    const write = {
      publish: jest.fn(),
    } as unknown as PortfolioWriteRepository;

    await expect(
      new PublishPortfolioUseCase(read, write).execute('en'),
    ).rejects.toThrow(NotFoundException);
    expect(write.publish).not.toHaveBeenCalled();
  });
});

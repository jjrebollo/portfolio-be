import { NotFoundException } from '@nestjs/common';
import {
  PortfolioReadRepository,
  PortfolioWriteRepository,
} from '../../domain/portfolio.repository';
import {
  PortfolioPublication,
  PortfolioSnapshot,
} from '../../domain/portfolio.types';
import { RestorePublicationUseCase } from './restore-publication.use-case';

const publication: PortfolioPublication = {
  locale: 'en',
  version: 1,
  payload: {
    schemaVersion: 1,
    siteMeta: { lang: 'en', title: 'T' },
    navigationLinks: [],
    siteContent: {},
  },
  publishedAt: new Date('2026-01-01T00:00:00.000Z'),
};

const restored: PortfolioSnapshot = {
  locale: 'en',
  status: 'PUBLISHED',
  payload: publication.payload,
  publishedAt: new Date('2026-02-01T00:00:00.000Z'),
  updatedAt: new Date('2026-02-01T00:00:00.000Z'),
};

describe('RestorePublicationUseCase', () => {
  it('re-publishes the requested version', async () => {
    const read = {
      findPublication: jest.fn().mockResolvedValue(publication),
    } as unknown as PortfolioReadRepository;
    const write = {
      publish: jest.fn().mockResolvedValue(restored),
    } as unknown as PortfolioWriteRepository;

    const result = await new RestorePublicationUseCase(read, write).execute(
      'en',
      1,
    );

    expect(read.findPublication).toHaveBeenCalledWith('en', 1);
    expect(write.publish).toHaveBeenCalledWith(
      'en',
      expect.objectContaining({ schemaVersion: 1 }),
    );
    expect(result.status).toBe('PUBLISHED');
  });

  it('throws NotFound and does not publish when the version is missing', async () => {
    const read = {
      findPublication: jest.fn().mockResolvedValue(null),
    } as unknown as PortfolioReadRepository;
    const write = {
      publish: jest.fn(),
    } as unknown as PortfolioWriteRepository;

    await expect(
      new RestorePublicationUseCase(read, write).execute('en', 99),
    ).rejects.toThrow(NotFoundException);
    expect(write.publish).not.toHaveBeenCalled();
  });
});

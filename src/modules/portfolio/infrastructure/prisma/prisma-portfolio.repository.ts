import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../../core/database/prisma.service';
import { PortfolioPayload } from '../../domain/portfolio-payload.schema';
import {
  PortfolioReadRepository,
  PortfolioWriteRepository,
} from '../../domain/portfolio.repository';
import {
  isSupportedLocale,
  PortfolioLocaleDocument,
  PortfolioSnapshot,
  SnapshotStatus,
  SupportedLocale,
} from '../../domain/portfolio.types';

type PersistedSnapshot = {
  locale: string;
  status: SnapshotStatus;
  payload: Prisma.JsonValue;
  publishedAt: Date | null;
  updatedAt: Date;
};

@Injectable()
export class PrismaPortfolioRepository
  implements PortfolioReadRepository, PortfolioWriteRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async findPublishedByLocale(
    locale: SupportedLocale,
  ): Promise<PortfolioSnapshot | null> {
    return this.findByLocaleAndStatus(locale, 'PUBLISHED');
  }

  async findByLocaleAndStatus(
    locale: SupportedLocale,
    status: SnapshotStatus,
  ): Promise<PortfolioSnapshot | null> {
    const snapshot = await this.prismaService.portfolioSnapshot.findUnique({
      where: {
        locale_status: {
          locale,
          status,
        },
      },
    });

    return snapshot ? this.toDomain(locale, snapshot) : null;
  }

  async listPublishedLocales(): Promise<SupportedLocale[]> {
    const snapshots = await this.prismaService.portfolioSnapshot.findMany({
      where: {
        status: 'PUBLISHED',
      },
      select: {
        locale: true,
      },
      orderBy: {
        locale: 'asc',
      },
    });

    return snapshots.map((snapshot) => snapshot.locale).filter(isSupportedLocale);
  }

  async upsertDraft(
    locale: SupportedLocale,
    payload: PortfolioPayload,
  ): Promise<PortfolioSnapshot> {
    return this.upsert(locale, 'DRAFT', payload, null);
  }

  async upsertPublished(
    locale: SupportedLocale,
    payload: PortfolioPayload,
  ): Promise<PortfolioSnapshot> {
    return this.upsert(locale, 'PUBLISHED', payload, new Date());
  }

  private async upsert(
    locale: SupportedLocale,
    status: SnapshotStatus,
    payload: PortfolioPayload,
    publishedAt: Date | null,
  ): Promise<PortfolioSnapshot> {
    const data = payload as unknown as Prisma.InputJsonValue;

    const snapshot = await this.prismaService.portfolioSnapshot.upsert({
      where: {
        locale_status: {
          locale,
          status,
        },
      },
      create: {
        locale,
        status,
        payload: data,
        publishedAt,
      },
      update: {
        payload: data,
        publishedAt,
      },
    });

    return this.toDomain(locale, snapshot);
  }

  private toDomain(
    locale: SupportedLocale,
    snapshot: PersistedSnapshot,
  ): PortfolioSnapshot {
    return {
      locale,
      status: snapshot.status,
      payload: snapshot.payload as unknown as PortfolioLocaleDocument,
      publishedAt: snapshot.publishedAt,
      updatedAt: snapshot.updatedAt,
    };
  }
}
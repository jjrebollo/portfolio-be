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
  PortfolioPublication,
  PortfolioPublicationSummary,
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

    return snapshots
      .map((snapshot) => snapshot.locale)
      .filter(isSupportedLocale);
  }

  async listPublications(
    locale: SupportedLocale,
  ): Promise<PortfolioPublicationSummary[]> {
    const publications = await this.prismaService.portfolioPublication.findMany(
      {
        where: { locale },
        select: { version: true, publishedAt: true },
        orderBy: { version: 'desc' },
      },
    );

    return publications.map((publication) => ({
      version: publication.version,
      publishedAt: publication.publishedAt,
    }));
  }

  async findPublication(
    locale: SupportedLocale,
    version: number,
  ): Promise<PortfolioPublication | null> {
    const publication =
      await this.prismaService.portfolioPublication.findUnique({
        where: { locale_version: { locale, version } },
      });

    if (!publication) {
      return null;
    }

    return {
      locale,
      version: publication.version,
      payload: publication.payload as unknown as PortfolioLocaleDocument,
      publishedAt: publication.publishedAt,
    };
  }

  async upsertDraft(
    locale: SupportedLocale,
    payload: PortfolioPayload,
  ): Promise<PortfolioSnapshot> {
    return this.upsert(locale, 'DRAFT', payload, null);
  }

  async publish(
    locale: SupportedLocale,
    payload: PortfolioPayload,
  ): Promise<PortfolioSnapshot> {
    const data = payload as unknown as Prisma.InputJsonValue;
    const publishedAt = new Date();

    // Append the immutable history entry and update the live published snapshot
    // in one transaction so they can never diverge.
    const snapshot = await this.prismaService.$transaction(async (tx) => {
      const latest = await tx.portfolioPublication.findFirst({
        where: { locale },
        orderBy: { version: 'desc' },
        select: { version: true },
      });
      const version = (latest?.version ?? 0) + 1;

      await tx.portfolioPublication.create({
        data: { locale, version, payload: data, publishedAt },
      });

      return tx.portfolioSnapshot.upsert({
        where: { locale_status: { locale, status: 'PUBLISHED' } },
        create: { locale, status: 'PUBLISHED', payload: data, publishedAt },
        update: { payload: data, publishedAt },
      });
    });

    return this.toDomain(locale, snapshot);
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

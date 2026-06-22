-- CreateEnum
CREATE TYPE "SnapshotStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "PortfolioSnapshot" (
    "id" TEXT NOT NULL,
    "locale" VARCHAR(5) NOT NULL,
    "status" "SnapshotStatus" NOT NULL DEFAULT 'PUBLISHED',
    "payload" JSONB NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioSnapshot_locale_key" ON "PortfolioSnapshot"("locale");

-- CreateIndex
CREATE INDEX "PortfolioSnapshot_status_idx" ON "PortfolioSnapshot"("status");

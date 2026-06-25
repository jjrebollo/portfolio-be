-- CreateTable
CREATE TABLE "PortfolioPublication" (
    "id" TEXT NOT NULL,
    "locale" VARCHAR(5) NOT NULL,
    "version" INTEGER NOT NULL,
    "payload" JSONB NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortfolioPublication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PortfolioPublication_locale_publishedAt_idx" ON "PortfolioPublication"("locale", "publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioPublication_locale_version_key" ON "PortfolioPublication"("locale", "version");

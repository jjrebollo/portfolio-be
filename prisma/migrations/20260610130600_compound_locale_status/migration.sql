/*
  Warnings:

  - A unique constraint covering the columns `[locale,status]` on the table `PortfolioSnapshot` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PortfolioSnapshot_locale_key";

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioSnapshot_locale_status_key" ON "PortfolioSnapshot"("locale", "status");

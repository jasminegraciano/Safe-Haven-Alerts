CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "category" AS ENUM ('HOTSPOT', 'LAW_ENFORCEMENT_PRESENCE', 'COMMUNITY_SHELTER', 'HEALTH_AND_SERVICES');

-- CreateTable
CREATE TABLE "alerts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "category" "category" NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DECIMAL(8,6) NOT NULL,
    "longitude" DECIMAL(9,6) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "alerts_latitude_longitude_idx" ON "alerts"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "alerts_category_idx" ON "alerts"("category");

-- CreateIndex
CREATE INDEX "alerts_title_idx" ON "alerts"("title");

-- CreateIndex
CREATE INDEX "alerts_address_idx" ON "alerts"("address");

-- CreateIndex
CREATE INDEX "alerts_description_idx" ON "alerts"("description");

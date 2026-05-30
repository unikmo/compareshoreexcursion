ALTER TABLE "locations" ADD COLUMN "location_type" TEXT NOT NULL DEFAULT 'CITY';
ALTER TABLE "routes" ADD COLUMN "estimated_transfer_min_minutes" INTEGER;
ALTER TABLE "routes" ADD COLUMN "estimated_transfer_max_minutes" INTEGER;

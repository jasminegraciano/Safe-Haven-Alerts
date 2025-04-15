-- This is an empty migration.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER TABLE "alerts" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

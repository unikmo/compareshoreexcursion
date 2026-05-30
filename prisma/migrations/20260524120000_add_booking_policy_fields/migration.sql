ALTER TABLE "bookings" ADD COLUMN "refund_eligible_amount_cents" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "bookings" ADD COLUMN "credit_amount_cents" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "bookings" ADD COLUMN "cancellation_reason" TEXT;
ALTER TABLE "bookings" ADD COLUMN "cancelled_at" DATETIME;
ALTER TABLE "bookings" ADD COLUMN "modified_at" DATETIME;

CREATE TABLE "booking_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "booking_id" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "old_value" TEXT,
    "new_value" TEXT,
    "performed_by" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "booking_events_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "booking_events_booking_id_created_at_idx" ON "booking_events"("booking_id", "created_at");

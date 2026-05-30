-- Add a customer-facing ticket number generated only after successful payment.
ALTER TABLE "bookings" ADD COLUMN "ticket_number" TEXT;

CREATE UNIQUE INDEX "bookings_ticket_number_key" ON "bookings"("ticket_number");

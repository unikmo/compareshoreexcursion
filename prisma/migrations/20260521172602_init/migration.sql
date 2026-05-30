-- CreateTable
CREATE TABLE "countries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "regions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "country_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "regions_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cities" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "region_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "cities_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "city_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "short_code" TEXT,
    "type" TEXT NOT NULL,
    "address" TEXT,
    "booking_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "locations_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "routes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "origin_location_id" TEXT NOT NULL,
    "destination_location_id" TEXT NOT NULL,
    "reverse_route_id" TEXT,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "is_bidirectional" BOOLEAN NOT NULL DEFAULT false,
    "default_price_cents" INTEGER,
    "admin_fallback_price_cents" INTEGER,
    "estimated_rideshare_low_cents" INTEGER,
    "estimated_rideshare_high_cents" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "routes_origin_location_id_fkey" FOREIGN KEY ("origin_location_id") REFERENCES "locations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "routes_destination_location_id_fkey" FOREIGN KEY ("destination_location_id") REFERENCES "locations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "route_departures" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "route_id" TEXT NOT NULL,
    "departure_at" DATETIME NOT NULL,
    "seats_total" INTEGER NOT NULL,
    "seats_booked" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "route_departures_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "routes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "supabase_auth_id" TEXT,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "customer_profiles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "phone" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "customer_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "operator_profiles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "operator_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "driver_profiles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "operator_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "driver_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "driver_profiles_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "operator_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "operator_id" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT,
    "plate_number" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "vehicles_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "operator_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "operator_routes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "operator_id" TEXT NOT NULL,
    "route_id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "operator_routes_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "operator_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "operator_routes_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "routes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pricing_rules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "route_id" TEXT NOT NULL,
    "operator_id" TEXT,
    "fare_type" TEXT NOT NULL,
    "base_price_cents" INTEGER NOT NULL,
    "luggage_included" INTEGER NOT NULL DEFAULT 1,
    "price_source" TEXT NOT NULL DEFAULT 'ROUTE_DEFAULT',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "pricing_rules_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "routes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "pricing_rules_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "operator_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "operator_claims" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "operator_id" TEXT,
    "company_name" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "operator_claims_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "operator_profiles" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customer_id" TEXT NOT NULL,
    "operator_id" TEXT NOT NULL,
    "route_id" TEXT NOT NULL,
    "departure_id" TEXT NOT NULL,
    "assigned_driver_id" TEXT,
    "vehicle_id" TEXT,
    "fare_type" TEXT NOT NULL,
    "price_source" TEXT NOT NULL DEFAULT 'ROUTE_DEFAULT',
    "scheduled_pickup_time" DATETIME NOT NULL,
    "estimated_arrival_window" TEXT,
    "lead_passenger_name" TEXT NOT NULL,
    "lead_passenger_email" TEXT NOT NULL,
    "lead_passenger_phone" TEXT NOT NULL,
    "passenger_count" INTEGER NOT NULL,
    "luggage_count" INTEGER NOT NULL,
    "flight_number" TEXT,
    "cruise_number" TEXT,
    "child_seats" INTEGER NOT NULL DEFAULT 0,
    "special_notes" TEXT,
    "travel_details" TEXT,
    "flex_change_count" INTEGER NOT NULL DEFAULT 0,
    "booking_source" TEXT NOT NULL DEFAULT 'MARKETPLACE',
    "booking_status" TEXT NOT NULL DEFAULT 'REQUESTED',
    "ride_status" TEXT,
    "total_amount_cents" INTEGER NOT NULL,
    "marketplace_fee_cents" INTEGER NOT NULL,
    "operator_payout_cents" INTEGER NOT NULL,
    "platform_revenue_cents" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "bookings_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer_profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bookings_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "operator_profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bookings_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "routes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bookings_departure_id_fkey" FOREIGN KEY ("departure_id") REFERENCES "route_departures" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bookings_assigned_driver_id_fkey" FOREIGN KEY ("assigned_driver_id") REFERENCES "driver_profiles" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "bookings_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "booking_passengers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "booking_id" TEXT NOT NULL,
    "passenger_number" INTEGER NOT NULL,
    "passenger_name" TEXT,
    "qr_code_token" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING_NAME',
    "checked_in_at" DATETIME,
    "checked_in_by_operator_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "booking_passengers_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "booking_passengers_checked_in_by_operator_id_fkey" FOREIGN KEY ("checked_in_by_operator_id") REFERENCES "operator_profiles" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "booking_changes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "booking_id" TEXT NOT NULL,
    "previous_departure_id" TEXT NOT NULL,
    "new_departure_id" TEXT NOT NULL,
    "changed_by_role" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "booking_changes_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "booking_id" TEXT NOT NULL,
    "amount_cents" INTEGER NOT NULL,
    "marketplace_fee_cents" INTEGER NOT NULL,
    "operator_payout_cents" INTEGER NOT NULL,
    "platform_revenue_cents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "provider" TEXT,
    "provider_reference" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "payments_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "booking_messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sender_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "booking_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "message_type" TEXT NOT NULL DEFAULT 'TEXT',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "booking_messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "booking_messages_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "booking_messages_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "operator_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "file_url" TEXT NOT NULL,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "documents_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "operator_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "booking_id" TEXT,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'UNREAD',
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "notifications_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "outreach_contacts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "operator_id" TEXT,
    "company_name" TEXT NOT NULL,
    "contact_name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "outreach_contacts_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "operator_profiles" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "import_batches" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "source" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "record_count" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "actor_id" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entity_id" TEXT,
    "metadata" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "audit_logs_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "venue_id" TEXT NOT NULL,
    "city_id" TEXT NOT NULL,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "expected_attendance" INTEGER,
    "booking_enabled" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'PLANNED',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "events_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "locations" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "events_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cruise_ships" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ship_name" TEXT NOT NULL,
    "cruise_line" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "cruise_schedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ship_id" TEXT NOT NULL,
    "terminal_id" TEXT NOT NULL,
    "arrival_date" DATETIME NOT NULL,
    "arrival_time" TEXT,
    "departure_time" TEXT,
    "estimated_passengers" INTEGER,
    "disembark_start" TEXT,
    "disembark_end" TEXT,
    "source" TEXT,
    "active_status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "cruise_schedules_ship_id_fkey" FOREIGN KEY ("ship_id") REFERENCES "cruise_ships" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "cruise_schedules_terminal_id_fkey" FOREIGN KEY ("terminal_id") REFERENCES "locations" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "countries"("code");

-- CreateIndex
CREATE UNIQUE INDEX "regions_country_id_code_key" ON "regions"("country_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "cities_region_id_name_key" ON "cities"("region_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "locations_city_id_name_key" ON "locations"("city_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "routes_origin_location_id_destination_location_id_key" ON "routes"("origin_location_id", "destination_location_id");

-- CreateIndex
CREATE INDEX "route_departures_route_id_departure_at_idx" ON "route_departures"("route_id", "departure_at");

-- CreateIndex
CREATE UNIQUE INDEX "users_supabase_auth_id_key" ON "users"("supabase_auth_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customer_profiles_user_id_key" ON "customer_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "operator_profiles_user_id_key" ON "operator_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "driver_profiles_user_id_key" ON "driver_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_operator_id_plate_number_key" ON "vehicles"("operator_id", "plate_number");

-- CreateIndex
CREATE UNIQUE INDEX "operator_routes_operator_id_route_id_key" ON "operator_routes"("operator_id", "route_id");

-- CreateIndex
CREATE UNIQUE INDEX "pricing_rules_route_id_operator_id_fare_type_key" ON "pricing_rules"("route_id", "operator_id", "fare_type");

-- CreateIndex
CREATE INDEX "bookings_customer_id_scheduled_pickup_time_idx" ON "bookings"("customer_id", "scheduled_pickup_time");

-- CreateIndex
CREATE INDEX "bookings_operator_id_scheduled_pickup_time_idx" ON "bookings"("operator_id", "scheduled_pickup_time");

-- CreateIndex
CREATE INDEX "bookings_route_id_idx" ON "bookings"("route_id");

-- CreateIndex
CREATE INDEX "bookings_assigned_driver_id_idx" ON "bookings"("assigned_driver_id");

-- CreateIndex
CREATE UNIQUE INDEX "booking_passengers_qr_code_token_key" ON "booking_passengers"("qr_code_token");

-- CreateIndex
CREATE UNIQUE INDEX "booking_passengers_booking_id_passenger_number_key" ON "booking_passengers"("booking_id", "passenger_number");

-- CreateIndex
CREATE INDEX "payments_booking_id_idx" ON "payments"("booking_id");

-- CreateIndex
CREATE INDEX "booking_messages_booking_id_created_at_idx" ON "booking_messages"("booking_id", "created_at");

-- CreateIndex
CREATE INDEX "booking_messages_sender_id_idx" ON "booking_messages"("sender_id");

-- CreateIndex
CREATE INDEX "booking_messages_receiver_id_idx" ON "booking_messages"("receiver_id");

-- CreateIndex
CREATE INDEX "notifications_user_id_status_idx" ON "notifications"("user_id", "status");

-- CreateIndex
CREATE INDEX "audit_logs_entity_entity_id_idx" ON "audit_logs"("entity", "entity_id");

-- CreateIndex
CREATE UNIQUE INDEX "cruise_ships_ship_name_cruise_line_key" ON "cruise_ships"("ship_name", "cruise_line");

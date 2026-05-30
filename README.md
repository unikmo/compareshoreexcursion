# Waylo

Waylo is an asset-light, fixed-fare shuttle marketplace for scheduled hub-to-hub mobility corridors.

Waylo does not own vehicles. It connects passengers with verified shuttle operators on predefined routes between fixed hubs such as airports, city hubs, cruise terminals, ports, event venues, convention centers, and trade fair locations.

Waylo is not door-to-door transport. It does not support arbitrary pickup/dropoff addresses, hotel-by-hotel routing, Uber-style dispatch, surge pricing, or dynamic pricing.

The platform is built around clear scheduled departures, fixed pickup hubs, fixed dropoff hubs, transparent fares, visible seat availability, ticket proof, payment handling, and operator coordination.

Convention centers, trade fairs, concerts, stadiums, and major event venues are supported as fixed demand nodes. They are enabled only when relevant demand exists, not as always-on dynamic routing targets.
- SQLite local development with Prisma.
- Next.js App Router and TypeScript.
- Global search hierarchy: Country, City, From, To, Departure date, Passengers.
- City options unlock after country selection and only show cities within that country.
- Predefined hub selection only; no arbitrary pickup/dropoff fields.
- Customer route cards with full location names, from price, frequency, next departure, and seats left.
- Low-friction booking form for lead passenger, email, phone, passenger count, luggage count, date, departure, fare, and optional travel details.
- Standard and Flex fare support.
- Pricing traceability through operator pricing rule, route default price, then admin fallback price.
- Booking confirmation with payment placeholder, ride visibility, messages, passenger passes, and QR token placeholders.
- Passenger manifest records equal to `passenger_count`.
- One unique QR token per passenger.
- Passenger names can be added after booking before check-in.
- Operator booking acceptance, assignment, manual ride-status updates, and persisted messaging.
- Operator boarding view with departure manifest, QR token lookup, manual check-in, and no-show marking.
- Admin list views for countries, regions, cities, locations/venues, routes, departures, operator routes, bookings, passenger manifests, payments, events, claims, and operators.
- Future-ready venues/events and cruise schedule placeholder tables.

## Intentionally Excluded

- Marketing pages
- Maps
- GPS tracking
- Live vehicle tracking
- Dynamic routing
- Arbitrary pickup/dropoff addresses
- Uber-style routing
- Native mobile apps
- AI dispatch
- Real QR camera scanning
- Live payment processing
- Cruise schedule intelligence

## Local SQLite Setup

Your `.env` should contain:

```bash
DATABASE_URL="file:./dev.db"
```

`.env.example` contains the same local SQLite setting.

## Commands

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
npm run dev
```

Open:

- `/customer`
- `/operator`
- `/operator/boarding`
- `/admin`

## Seed Data

The seed creates:

- Countries: United States, Spain
- Cities: Miami, New York, Orlando, Las Vegas, Barcelona
- Miami and Barcelona active booking corridors
- Explicit airport-to-cruise and cruise-to-airport route records
- Major future venues for Miami, New York, Las Vegas, and Orlando with booking disabled unless intentionally enabled
- Sample verified operators, drivers, vehicles, departures, pricing rules, booking, payment, messages, passenger passes, events, and cruise schedule placeholders

## Booking Rules Enforced

- Bookings use predefined `route_id`.
- Bookings use predefined active `route_departure`.
- No arbitrary pickup/dropoff addresses are accepted.
- Route must be active.
- Departure must be active.
- Seats must be available.
- Operator can accept bookings only for enabled routes.
- Operator can check in passengers only for assigned/accepted routes.
- Cancelled/declined bookings cannot be checked in.
- Cancelled passengers cannot be checked in.
- Checked-in passengers cannot be edited without future admin/operator override.
- Flex changes are limited to 2.
- Flex changes require at least 12 hours before pickup.
- Flex changes stay on the same corridor and same day or plus/minus 1 day.
- Standard fare cannot be changed unless a future admin/operator override is added.
- Customer-to-driver messaging requires driver assignment/ride status.
- Masked call and SMS relay remain event records only.

## Known Limitations

- Supabase Auth remains placeholder-level for local MVP navigation.
- Operator selection is simplified to the first verified operator for the local MVP.
- Admin pages are list/manage placeholders, not full polished CRUD.
- QR token lookup is text-based only; no camera scanner is implemented.
- Payments are placeholder records.
- Events and cruise schedules are demand-signal infrastructure only and do not drive route departures.
- Design polish is intentionally deferred.

## Next Recommended Build Step

Replace placeholder auth with real Supabase session hydration and ownership checks, then add focused tests around booking creation, price resolution, Flex changes, and passenger check-in.


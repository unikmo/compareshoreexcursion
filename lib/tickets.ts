import { prisma } from "@/lib/prisma";

const cityCodes: Record<string, string> = {
  Miami: "001",
  "New York": "002",
  Orlando: "003",
  "Las Vegas": "004",
  Barcelona: "005",
};

function dateStamp(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function cityCode(cityName: string) {
  const code = cityCodes[cityName];
  if (!code) throw new Error(`Missing ShuttleFlow ticket city code for ${cityName}.`);
  return code;
}

function ticketPrefix(departureTime: Date, cityName: string) {
  return `${dateStamp(departureTime)}${cityCode(cityName)}`;
}

function ticketNumberFromSequence(prefix: string, sequence: number) {
  return `${prefix}${String(sequence).padStart(4, "0")}`;
}

export async function ensureTicketNumberStorage() {
  const columns = await prisma.$queryRaw<Array<{ name: string }>>`
    PRAGMA table_info(bookings)
  `;
  const hasTicketNumber = columns.some((column) => column.name === "ticket_number");

  if (!hasTicketNumber) {
    await prisma.$executeRawUnsafe(`ALTER TABLE "bookings" ADD COLUMN "ticket_number" TEXT`);
  }

  await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "bookings_ticket_number_key" ON "bookings"("ticket_number")`);
}

export async function ensureBookingTicketNumber(booking: {
  id: string;
  ticketNumber?: string | null;
  scheduledPickupTime: Date;
  route: { origin: { city: { name: string } } };
}) {
  await ensureTicketNumberStorage();
  if (booking.ticketNumber) return booking.ticketNumber;

  const prefix = ticketPrefix(booking.scheduledPickupTime, booking.route.origin.city.name);

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const latestTickets = await prisma.$queryRaw<Array<{ ticket_number: string }>>`
      SELECT ticket_number
      FROM bookings
      WHERE ticket_number LIKE ${`${prefix}%`}
      ORDER BY ticket_number DESC
      LIMIT 1
    `;
    const latestTicketNumber = latestTickets[0]?.ticket_number;
    const latestSequence = latestTicketNumber ? Number.parseInt(latestTicketNumber.slice(prefix.length), 10) || 0 : 0;
    const ticketNumber = ticketNumberFromSequence(prefix, latestSequence + 1 + attempt);

    try {
      await prisma.$executeRaw`
        UPDATE bookings
        SET ticket_number = ${ticketNumber}
        WHERE id = ${booking.id}
      `;
      return ticketNumber;
    } catch {
      // Retry on unique collisions from concurrent ticket generation.
    }
  }

  throw new Error("Could not generate a unique ticket number.");
}

export function passengerBoardingReference(ticketNumber: string, passengerNumber: number) {
  return `${ticketNumber}P${passengerNumber}`;
}

export async function getStoredTicketNumber(bookingId: string) {
  await ensureTicketNumberStorage();
  const rows = await prisma.$queryRaw<Array<{ ticket_number: string | null }>>`
    SELECT ticket_number
    FROM bookings
    WHERE id = ${bookingId}
    LIMIT 1
  `;
  return rows[0]?.ticket_number ?? null;
}

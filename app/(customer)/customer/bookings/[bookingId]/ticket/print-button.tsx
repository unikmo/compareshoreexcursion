"use client";

export function PrintTicketButton() {
  return (
    <button className="ticket-print-button" type="button" onClick={() => window.print()}>
      Download ticket
    </button>
  );
}

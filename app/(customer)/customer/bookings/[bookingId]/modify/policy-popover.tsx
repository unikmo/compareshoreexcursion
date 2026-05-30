"use client";

import { useEffect, useRef, useState } from "react";

export function PolicyPopover() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div className="booking-policy-popover" ref={containerRef}>
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        Cancellation and change policy
      </button>
      {open && (
        <ul>
          <li>Cancel free up to 24h before departure.</li>
          <li>Modify route, date, departure, and passenger count up to 6h before departure.</li>
          <li>Name, email, phone, and notes may be updated until 4h before departure.</li>
          <li>Missed rides and no-shows are non-refundable.</li>
        </ul>
      )}
    </div>
  );
}

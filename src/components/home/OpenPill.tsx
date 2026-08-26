"use client";

import { useEffect, useState } from "react";
import { counterStatus } from "@/lib/store-hours";

/**
 * Live open state, worked out in India Standard Time. Rendered empty on the
 * server so the markup cannot disagree with the client clock, which is the
 * usual source of a hydration mismatch on anything time based.
 */
export function OpenPill() {
  const [status, setStatus] = useState<ReturnType<typeof counterStatus> | null>(
    null,
  );

  useEffect(() => {
    const tick = () => setStatus(counterStatus());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) return <span className="h-[1.75rem]" aria-hidden="true" />;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.75rem] tracking-[0.04em] ${
        status.open
          ? "border-[rgba(138,90,59,0.3)] bg-terracotta-100 text-cocoa"
          : "border-[rgba(138,90,59,0.25)] bg-clay text-caramel"
      }`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {status.open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta-600 opacity-70 motion-reduce:animate-none" />
        )}
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
            status.open ? "bg-terracotta-700" : "bg-muted"
          }`}
        />
      </span>
      {status.label}
      <span className="text-caramel">{status.detail}</span>
    </span>
  );
}

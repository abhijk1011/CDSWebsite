import { hours } from "@/content/site";

/**
 * Whether the counter is open right now, in India Standard Time,
 * regardless of where the visitor is sitting.
 */
export function counterStatus(now: Date = new Date()) {
  const ist = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  );
  const minutes = ist.getHours() * 60 + ist.getMinutes();
  const open = minutes >= hours.openMinutes && minutes < hours.closeMinutes;

  const clock = ist.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  return {
    open,
    clock,
    label: open ? "Open now" : "Closed right now",
    detail: open
      ? `Counters run until ${hours.close}`
      : `Opens at ${hours.open}`,
  };
}

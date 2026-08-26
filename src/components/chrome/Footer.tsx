import Link from "next/link";
import { brand, nav, stores, social, hours } from "@/content/site";
import { categories } from "@/content/categories";
import { Arrow } from "@/components/primitives/Button";

/**
 * One of only two cocoa surfaces on the site. The smoke sub band gives the
 * dark area a second plane so it does not read as one flat slab.
 */
export function Footer() {
  const counters = categories.slice(0, 8);

  return (
    <footer className="relative overflow-hidden bg-cocoa text-cream">
      <div className="shell pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow text-on-dark-muted">{brand.region}</p>
            <p className="mt-5 max-w-[19ch] font-display text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.02] text-cream display-wonk">
              {brand.promise}
            </p>
            <Link
              href="/contact"
              className="group mt-9 inline-flex items-center gap-2.5 rounded-full border border-[rgba(253,248,242,0.28)] px-7 py-4 text-[0.9375rem] transition-[background-color,border-color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[rgba(253,248,242,0.5)] hover:bg-[rgba(253,248,242,0.08)] active:scale-[0.98]"
            >
              Find your nearest counter
              <Arrow />
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <nav aria-label="Pages">
              <h2 className="eyebrow text-on-dark-muted">Pages</h2>
              <ul className="mt-5 space-y-2.5">
                <li>
                  <FooterLink href="/">Home</FooterLink>
                </li>
                {nav.map((n) => (
                  <li key={n.href}>
                    <FooterLink href={n.href}>{n.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Counters">
              <h2 className="eyebrow text-on-dark-muted">Counters</h2>
              <ul className="mt-5 space-y-2.5">
                {counters.map((c) => (
                  <li key={c.id}>
                    <FooterLink href={`/what-we-sell#${c.id}`}>
                      {c.name}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="eyebrow text-on-dark-muted">Visit</h2>
              <ul className="mt-5 space-y-5">
                {stores.map((s) => (
                  <li key={s.slug}>
                    <p className="text-[0.95rem] text-cream">{s.city}</p>
                    <a
                      href={`tel:${s.phoneDial}`}
                      className="mt-0.5 block text-[0.9rem] tnum text-on-dark-muted transition-colors duration-200 hover:text-cream"
                    >
                      {s.phoneDisplay}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[0.85rem] leading-relaxed text-on-dark-muted">
                {hours.days}
                <br />
                {hours.open} to {hours.close}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Oversized wordmark. Sits low and quiet, a stamp rather than a logo. */}
      <div className="shell pointer-events-none select-none pb-2" aria-hidden="true">
        <p className="font-display text-[clamp(5rem,22vw,17rem)] leading-[0.8] tracking-[-0.03em] text-[rgba(253,248,242,0.07)] display-wonk">
          {brand.short}
        </p>
      </div>

      <div className="border-t border-[rgba(253,248,242,0.14)] bg-smoke">
        <div className="shell flex flex-col gap-4 py-6 text-[0.8125rem] text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-6">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-200 hover:text-cream"
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li className="text-[rgba(253,248,242,0.4)]">
              This site is a showcase. Orders are taken at the counter.
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-[0.95rem] text-on-dark-muted transition-colors duration-200 hover:text-cream"
    >
      {children}
    </Link>
  );
}

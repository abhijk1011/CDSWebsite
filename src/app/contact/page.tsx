import type { Metadata } from "next";
import { PageHeader } from "@/components/chrome/PageHeader";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { OpenPill } from "@/components/home/OpenPill";
import { contact } from "@/content/pages";
import { stores, hours, social } from "@/content/site";
import { MaskReveal, Rise } from "@/components/primitives/Reveal";
import { Arrow } from "@/components/primitives/Button";
import { MapPanel } from "@/components/contact/MapPanel";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit CDS in Valsad or Vapi. Call the counter for custom cakes, bulk sweet orders, festive hampers or a franchise conversation.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow={contact.eyebrow}
        lines={["Come to the counter."]}
        linesSm={["Come to", "the counter."]}
        standfirst={contact.standfirst}
        aside={
          <div className="mt-8">
            <OpenPill />
          </div>
        }
      />

      <section className="shell grid gap-14 pb-24 lg:grid-cols-[1fr_26rem] lg:gap-20 lg:pb-32">
        <div className="order-2 space-y-4 lg:order-1 lg:space-y-5">
          {stores.map((store, i) => (
            <Rise key={store.slug} index={i}>
              <article className="overflow-hidden rounded-2xl border border-[rgba(138,90,59,0.18)] bg-cream shadow-[0_2px_12px_rgba(58,35,26,0.06)]">
                <div className="aspect-[16/9] w-full sm:aspect-[21/9]">
                  <MapPanel store={store} />
                </div>

                <div className="grid gap-7 p-7 md:grid-cols-[1fr_auto] md:items-end md:p-9">
                  <div>
                    <h2 className="font-display text-[1.75rem] leading-tight text-cocoa md:text-[2rem]">
                      {store.label}
                    </h2>
                    <address className="mt-4 not-italic text-[1rem] leading-relaxed text-body">
                      {store.lines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                      <span className="mt-1 block text-caramel">
                        {store.pin}
                      </span>
                    </address>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`tel:${store.phoneDial}`}
                      className="group inline-flex items-center gap-2 rounded-full bg-terracotta-700 px-5 py-3 text-[0.875rem] text-cream transition-[background-color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-terracotta-800 active:scale-[0.98]"
                    >
                      Call
                      <Arrow />
                    </a>
                    <a
                      href={`https://wa.me/${store.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[rgba(138,90,59,0.4)] px-5 py-3 text-[0.875rem] text-cocoa transition-[background-color,border-color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-caramel hover:bg-clay active:scale-[0.98]"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`https://maps.google.com/maps?q=${encodeURIComponent(
                        store.mapsQuery,
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[rgba(138,90,59,0.4)] px-5 py-3 text-[0.875rem] text-cocoa transition-[background-color,border-color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-caramel hover:bg-clay active:scale-[0.98]"
                    >
                      Directions
                    </a>
                  </div>
                </div>
              </article>
            </Rise>
          ))}

          <Rise index={2}>
            <div className="grid gap-px overflow-hidden rounded-2xl bg-[rgba(138,90,59,0.18)] sm:grid-cols-2">
              <div className="bg-clay p-7">
                <h3 className="eyebrow">Opening hours</h3>
                <p className="mt-3 font-display text-[1.4rem] leading-snug text-cocoa">
                  {hours.days}
                </p>
                <p className="mt-1 text-[1.0625rem] tnum text-body">
                  {hours.open} to {hours.close}
                </p>
                <p className="mt-4 text-[0.875rem] leading-relaxed text-caramel">
                  {hours.note}
                </p>
              </div>
              <div className="bg-clay p-7">
                <h3 className="eyebrow">Elsewhere</h3>
                <ul className="mt-3 space-y-2">
                  {social.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 font-display text-[1.4rem] text-cocoa transition-colors duration-200 hover:text-terracotta-700"
                      >
                        {s.label}
                        <Arrow />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Rise>
        </div>

        <div className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-28">
            <MaskReveal
              as="h2"
              className="font-display text-[clamp(1.6rem,3vw,2.15rem)] leading-tight text-cocoa"
              lines={["Ask us something."]}
            />
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
              Custom cakes, bulk orders and hampers are easiest to sort out over
              a message.
            </p>
            <div className="mt-8">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/chrome/PageHeader";
import { about } from "@/content/pages";
import { stores, hours, brand } from "@/content/site";
import { categories } from "@/content/categories";
import { MaskReveal, Rise } from "@/components/primitives/Reveal";
import { Button, Arrow } from "@/components/primitives/Button";
import { Mark } from "@/components/marks";

export const metadata: Metadata = {
  title: "About us",
  description:
    "CDS stands for Charliee Day to Day Stores. Two shops in south Gujarat built on small batches, honest grades and a scale that faces the customer.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={about.eyebrow}
        lines={["A day to day store", "that refuses to be ordinary."]}
        linesSm={["A day to day store", "that refuses", "to be ordinary."]}
        standfirst={about.standfirst}
        aside={
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-[rgba(138,90,59,0.18)]">
            <div className="bg-clay p-5">
              <dt className="text-[0.8125rem] text-caramel">Stores</dt>
              <dd className="mt-1 font-display text-[1.6rem] tnum text-cocoa">
                {stores.length}
              </dd>
            </div>
            <div className="bg-clay p-5">
              <dt className="text-[0.8125rem] text-caramel">Counters</dt>
              <dd className="mt-1 font-display text-[1.6rem] tnum text-cocoa">
                {categories.length}
              </dd>
            </div>
            <div className="bg-clay p-5">
              <dt className="text-[0.8125rem] text-caramel">Region</dt>
              <dd className="mt-1 font-display text-[1.15rem] leading-snug text-cocoa">
                South Gujarat
              </dd>
            </div>
          </dl>
        }
      />

      {/* Chapters. The number sits in display type at a size that carries the
          column on its own, so the copy needs no decoration beside it. */}
      <section className="shell pb-20 md:pb-28">
        <ol className="border-t border-[rgba(138,90,59,0.18)]">
          {about.chapters.map((c) => (
            <li
              key={c.n}
              className="grid gap-4 border-b border-[rgba(138,90,59,0.18)] py-10 md:grid-cols-[6rem_1fr] md:gap-10 md:py-14 lg:grid-cols-[7rem_0.85fr_1.35fr] lg:gap-12"
            >
              <Rise index={0}>
                <span className="font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-none text-clay display-wonk">
                  {c.n}
                </span>
              </Rise>

              <Rise index={1}>
                <h2 className="max-w-[18ch] font-display text-h3 text-cocoa">
                  {c.title}
                </h2>
              </Rise>

              <Rise index={2} className="lg:pt-1.5">
                <p className="max-w-prose text-[1.0625rem] leading-relaxed text-body">
                  {c.body}
                </p>
              </Rise>
            </li>
          ))}
        </ol>
      </section>

      {/* Values on the clay band, which breaks up the cream before the one
          dark block on this page. */}
      <section className="border-y border-[rgba(138,90,59,0.18)] bg-clay py-20 md:py-28">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
            <div>
              <p className="eyebrow">How we run it</p>
              <MaskReveal
                as="h2"
                className="mt-5 font-display text-h2 text-cocoa display-wonk"
                lines={["Four rules we have never", "had a reason to break."]}
                linesSm={["Four rules we have", "never had a reason", "to break."]}
              />
            </div>
            <Rise className="lg:pb-1.5">
              <p className="text-[1.0625rem] leading-relaxed text-body">
                None of these are written on a wall anywhere. They are simply
                what happens when the person who owns the shop is also the
                person standing behind the scale.
              </p>
            </Rise>
          </div>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-[rgba(138,90,59,0.18)] md:grid-cols-2">
            {about.values.map((v, i) => (
              <li key={v.title} className="bg-cream p-7 md:p-9">
                <Rise index={i}>
                  <span className="font-display text-[0.8125rem] tnum text-caramel">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-[1.4rem] leading-snug text-cocoa">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-body">
                    {v.body}
                  </p>
                </Rise>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The single cocoa band on this page. */}
      <section className="bg-cocoa py-20 text-cream md:py-28">
        <div className="shell">
          <div className="mx-auto max-w-4xl text-center">
            <Mark
              name="charliee"
              className="mx-auto h-12 w-12 text-terracotta-600"
            />
            <MaskReveal
              as="p"
              className="mt-8 font-display text-[clamp(1.6rem,4vw,2.9rem)] leading-[1.15] text-cream display-wonk"
              lines={[
                "We are not trying to be the",
                "biggest shop in Gujarat.",
                "We would like to be the one",
                "you send your mother to.",
              ]}
            />
            <Rise index={2}>
              <p className="mt-9 text-[0.9375rem] tracking-[0.04em] text-on-dark-muted">
                {brand.name}
              </p>
            </Rise>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="shell">
          <p className="eyebrow">Where to find us</p>
          <MaskReveal
            as="h2"
            className="mt-5 font-display text-h2 text-cocoa display-wonk"
            lines={["Two shops, both worth the drive."]}
            linesSm={["Two shops, both", "worth the drive."]}
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5">
            {stores.map((s, i) => (
              <Rise key={s.slug} index={i}>
                <div className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-[rgba(138,90,59,0.18)] bg-cream p-7 shadow-[0_2px_12px_rgba(58,35,26,0.06)] md:p-9">
                  <div>
                    <h3 className="font-display text-[1.75rem] text-cocoa">
                      {s.city}
                    </h3>
                    <address className="mt-4 not-italic text-[1rem] leading-relaxed text-body">
                      {s.lines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                      <span className="mt-1 block text-caramel">{s.pin}</span>
                    </address>
                    <p className="mt-5 text-[0.875rem] text-caramel">
                      {hours.days}, {hours.open} to {hours.close}
                    </p>
                  </div>
                  <Button href={`tel:${s.phoneDial}`} variant="secondary" fluid>
                    {s.phoneDisplay}
                    <Arrow />
                  </Button>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/chrome/PageHeader";
import { Steps } from "@/components/franchise/Steps";
import { franchise } from "@/content/pages";
import { stores } from "@/content/site";
import { MaskReveal, Rise } from "@/components/primitives/Reveal";
import { Button, Arrow } from "@/components/primitives/Button";

export const metadata: Metadata = {
  title: "Franchise",
  description:
    "The CDS franchise model: fifteen counters, supply at our own buying price, a live kitchen setup and training on a real counter in Valsad or Vapi.",
};

export default function FranchisePage() {
  return (
    <>
      <PageHeader
        eyebrow={franchise.eyebrow}
        lines={["Run the counter in your city."]}
        linesSm={["Run the counter", "in your city."]}
        standfirst={franchise.standfirst}
        aside={
          <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-[rgba(138,90,59,0.18)]">
            {franchise.facts.map((f) => (
              <div key={f.label} className="bg-cream p-5">
                <dt className="text-[0.8125rem] text-caramel">{f.label}</dt>
                <dd className="mt-1.5 font-display text-[1.15rem] leading-snug text-cocoa">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      <section className="shell pb-10">
        <p className="eyebrow">How it goes</p>
        <MaskReveal
          as="h2"
          className="mt-5 font-display text-h2 text-cocoa display-wonk"
          lines={["Five steps, about four months."]}
          linesSm={["Five steps,", "about four months."]}
        />
      </section>

      <Steps />

      <section className="border-y border-[rgba(138,90,59,0.18)] bg-clay py-20 md:py-28">
        <div className="shell">
          <p className="eyebrow">What you get</p>
          <MaskReveal
            as="h2"
            className="mt-5 font-display text-h2 text-cocoa display-wonk"
            lines={["Not a logo file and good luck."]}
            linesSm={["Not a logo file", "and good luck."]}
          />

          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-[rgba(138,90,59,0.18)] md:grid-cols-2 lg:grid-cols-3">
            {franchise.offer.map((o, i) => (
              <li key={o.title} className="bg-cream p-7 md:p-8">
                <Rise index={i % 3}>
                  <h3 className="font-display text-[1.3rem] leading-snug text-cocoa">
                    {o.title}
                  </h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-body">
                    {o.body}
                  </p>
                </Rise>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cocoa py-20 text-cream md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <MaskReveal
            as="h2"
            className="font-display text-h2 text-cream display-wonk"
            lines={["You will speak to the", "family, not a sales team."]}
            linesSm={["You will speak", "to the family,", "not a sales team."]}
          />
          <Rise>
            <p className="text-[1.0625rem] leading-relaxed text-on-dark-muted">
              {franchise.closing} Tell us the city and the site you have in
              mind, and we will tell you honestly whether we think it works.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact">
                Start a conversation
                <Arrow />
              </Button>
              <Button href={`tel:${stores[0].phoneDial}`} variant="onDark">
                {stores[0].phoneDisplay}
              </Button>
            </div>
          </Rise>
        </div>
      </section>
    </>
  );
}

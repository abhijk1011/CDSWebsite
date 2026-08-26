import { franchise } from "@/content/pages";
import { MaskReveal, Rise } from "@/components/primitives/Reveal";
import { Button, Arrow } from "@/components/primitives/Button";

export function FranchiseTeaser() {
  return (
    <section className="bg-cream pb-24 md:pb-32">
      <div className="shell">
        <div className="overflow-hidden rounded-[1.5rem] border border-[rgba(138,90,59,0.18)] bg-clay">
          <div className="grid gap-10 p-8 md:p-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow">{franchise.eyebrow}</p>
              <MaskReveal
                as="h2"
                className="mt-5 max-w-[14ch] font-display text-h2 text-cocoa display-wonk"
                lines={["Run the counter", "in your city."]}
              />
              <Rise index={1}>
                <p className="mt-7 max-w-lg text-[1.0625rem] leading-relaxed text-body">
                  {franchise.standfirst}
                </p>
                <div className="mt-9">
                  <Button href="/franchise">
                    How the model works
                    <Arrow />
                  </Button>
                </div>
              </Rise>
            </div>

            <Rise index={2} className="lg:pt-2">
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-[rgba(138,90,59,0.18)]">
                {franchise.facts.map((f) => (
                  <div key={f.label} className="bg-cream p-5 md:p-6">
                    <dt className="text-[0.8125rem] text-caramel">{f.label}</dt>
                    <dd className="mt-1.5 font-display text-[1.15rem] leading-snug text-cocoa md:text-[1.3rem]">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-[0.875rem] leading-relaxed text-caramel">
                {franchise.closing}
              </p>
            </Rise>
          </div>
        </div>
      </div>
    </section>
  );
}

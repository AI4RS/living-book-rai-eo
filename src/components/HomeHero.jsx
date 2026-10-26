import { PAGES, hrefFor } from "../config/navigation";
import DottedEllipse from "./DottedEllipse";

const HOME_LEAD =
  "A living reference for building, evaluating, and deploying EO models that work fairly, safely, and accountably.";

// The three ways into the book; the first is the primary button.
const HERO_LINKS = [PAGES.lifecycle, PAGES.principles, PAGES.applications];

const heroButton =
  "inline-flex min-h-[52px] w-full items-center justify-center px-6 text-[17px] font-bold transition-colors focus-visible:outline-white sm:w-auto";

// Full-width accent band at the top of Home.
export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-accent px-5 pb-12 pt-12 text-white md:px-16 md:pb-[104px] md:pt-24">
      <DottedEllipse className="-right-36 w-[420px] opacity-15 lg:-right-24 lg:w-[520px] lg:opacity-20 xl:-right-10 xl:w-[640px] xl:opacity-40" />

      <div className="relative mx-auto max-w-6xl">
        <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-iadf-tint">
          A living book by IEEE GRSS IADF · WG-RAI
        </p>
        <h1 className="mt-4 max-w-[720px] font-serif text-[34px] font-bold leading-[1.08] text-white md:text-[64px]">
          Responsible AI in Earth Observation
        </h1>
        <p className="mt-6 max-w-[640px] text-lg leading-relaxed text-accent-tint md:text-xl">
          {HOME_LEAD}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {HERO_LINKS.map((page, index) => (
            <a
              key={page.id}
              href={hrefFor(page.id)}
              className={`${heroButton} ${
                index === 0
                  ? "bg-white text-accent-hover hover:bg-iadf-tint"
                  : "border-2 border-white text-white hover:bg-white/10"
              }`}
            >
              {page.label}
            </a>
          ))}
        </div>
        <p className="mt-8 max-w-[560px] text-sm leading-relaxed text-iadf-tint">
          Working Group on Responsible AI for Earth Observation (WG-RAI), IEEE GRSS
          Image Analysis and Data Fusion Technical Committee
        </p>
      </div>
    </section>
  );
}

import DottedEllipse from "./DottedEllipse";

// Slim accent band under the header on every page except Home, where the full
// HomeHero takes its place. Shows the page name and its tagline.
export default function PageBanner({ page }) {
  return (
    <section className="relative overflow-hidden bg-accent text-white">
      <DottedEllipse className="-right-40 w-[360px] opacity-15 md:-right-24 md:opacity-25 lg:-right-10 lg:w-[420px] lg:opacity-35" />
      <div className="relative mx-auto max-w-6xl px-4 py-7 md:py-9">
        <p className="font-serif text-2xl font-bold leading-tight md:text-[34px]">
          {page.longLabel ?? page.label}
        </p>
        {page.tagline && (
          <p className="mt-2 max-w-[640px] leading-relaxed text-accent-tint md:text-lg">
            {page.tagline}
          </p>
        )}
      </div>
    </section>
  );
}

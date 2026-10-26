import { EXTERNAL_LINKS, MAIN_NAV, PAGES, hrefFor } from "../config/navigation";

const footerLink =
  "inline-flex min-h-11 items-center text-white underline-offset-4 hover:underline focus-visible:outline-white";

export default function SiteFooter() {
  const pageLinks = MAIN_NAV.filter((item) => item.id !== PAGES.home.id);

  return (
    <footer className="mt-16 bg-navy text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:flex-row md:items-start md:justify-between">
        <p className="max-w-md text-sm leading-relaxed text-iadf-tint">
          Living Book of the IEEE GRSS Image Analysis and Data Fusion Technical
          Committee (IADF), Working Group on Responsible AI for Earth Observation
          (WG-RAI).
        </p>

        <nav aria-label="Footer">
          <ul className="flex flex-col md:items-end">
            {pageLinks.map((item) => (
              <li key={item.id}>
                <a href={hrefFor(item.id)} className={footerLink}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={EXTERNAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className={footerLink}
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

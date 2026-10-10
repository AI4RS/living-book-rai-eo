import grssLogo from "../assets/grss-logo.svg";
import iadfLogo from "../assets/IADF.webp";
import { EXTERNAL_LINKS, MAIN_NAV, PAGES, hrefFor } from "../config/navigation";

const LOGOS = [
  {
    src: iadfLogo,
    alt: "IEEE GRSS Image Analysis and Data Fusion logo",
    href: EXTERNAL_LINKS.iadf,
  },
  {
    src: grssLogo,
    alt: "IEEE Geoscience and Remote Sensing Society logo",
    href: EXTERNAL_LINKS.grss,
  },
];

const footerLink =
  "inline-flex min-h-11 items-center text-white underline-offset-4 hover:underline focus-visible:outline-white";

export default function SiteFooter() {
  const pageLinks = MAIN_NAV.filter((item) => item.id !== PAGES.home.id);

  return (
    <footer className="mt-16 bg-navy text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex shrink-0 gap-3">
            {LOGOS.map((logo) => (
              <a
                key={logo.href}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white p-3 focus-visible:outline-white"
              >
                <img src={logo.src} alt={logo.alt} className="h-12 w-auto md:h-16" />
              </a>
            ))}
          </div>
          <p className="max-w-md text-sm leading-relaxed text-iadf-tint">
            Living Book of the IEEE GRSS Image Analysis and Data Fusion Technical
            Committee (IADF), Working Group on Responsible AI for Earth Observation
            (WG-RAI).
          </p>
        </div>

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

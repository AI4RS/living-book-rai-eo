// "Who we are": the people behind the book. Shown as a section on Home through
// components/TeamList.jsx; the same data and component can back a separate
// "Who we are" tab later.
//
// Each person: { name, role, affiliation, link? }. role is the person's role in
// the book. link is optional: { label, href } to a personal page, ORCID, or
// Google Scholar; without an href the label shows as plain text.
export const WHO_WE_ARE = {
  title: "Who we are",
  intro: "This Living Book is written by the people below. It is open to contributions.",
  contribute: {
    text: "Want to contribute? Each chapter is one Markdown file; start with the",
    linkLabel: "contributor guide on GitHub",
  },
  // PLACEHOLDER entries: replace with real people.
  people: [
    { name: "[Name]", role: "[Role in the book]", affiliation: "[Affiliation]", link: { label: "[Link]" } },
    { name: "[Name]", role: "[Role in the book]", affiliation: "[Affiliation]", link: { label: "[Link]" } },
    { name: "[Name]", role: "[Role in the book]", affiliation: "[Affiliation]", link: { label: "[Link]" } },
  ],
};

import { parseChapterFile, splitSections } from "./chapterFile";

// Every chapter file, bundled at build time: { "../content/chapters/<part>/<id>.md": text }.
const FILES = import.meta.glob("../content/chapters/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// A chapter's front matter and sections, or null when it has no file yet.
export function loadChapter(part, id) {
  const text = FILES[`../content/chapters/${part}/${id}.md`];
  if (text === undefined) return null;

  const { data, body, errors } = parseChapterFile(text);
  if (errors.length && import.meta.env.DEV) {
    console.warn(`Chapter ${part}/${id}.md: ${errors.join(" ")}`);
  }
  return { ...data, ...splitSections(body) };
}

// Check the chapter Markdown files against src/config/navigation.js.
// Run with `npm run check:chapters`; it also runs before every `npm run build`.
//
// Errors (the check fails): a file that belongs to no chapter, or front matter
// that can't be read. Warnings (the check passes): a chapter with no file, or
// headings that don't match the part's outline.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { CHAPTERS, CHAPTER_SECTIONS } from "../src/config/navigation.js";
import { CHAPTER_DIR, chapterPath, checkOutline, parseChapterFile, splitSections } from "../src/lib/chapterFile.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const errors = [];
const warnings = [];
const report = (list, file, message) => list.push({ file, message });

const listFiles = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });

const expected = new Map(
  Object.entries(CHAPTERS).flatMap(([part, chapters]) =>
    chapters.map((chapter) => [chapterPath(part, chapter.id), { part, chapter }]),
  ),
);
const found = listFiles(join(root, CHAPTER_DIR))
  .map((path) => relative(root, path).split("\\").join("/"))
  .filter((path) => path.endsWith(".md"));

for (const [path, { part, chapter }] of expected) {
  if (!found.includes(path)) {
    report(
      warnings,
      path,
      `The chapter "${chapter.label}" has no file, so its page shows only placeholders. Create ${path}, for example by copying another chapter of the "${part}" part.`,
    );
  }
}

for (const path of found) {
  const entry = expected.get(path);
  if (!entry) {
    report(
      errors,
      path,
      `This file belongs to no chapter. Chapter files are named ${CHAPTER_DIR}/<part>/<chapter-id>.md, using a part and chapter id from src/config/navigation.js. Rename or move it; to add a new chapter, ask a maintainer in an issue.`,
    );
    continue;
  }

  const { body, errors: frontErrors, warnings: frontWarnings } = parseChapterFile(
    readFileSync(join(root, path), "utf8"),
  );
  frontErrors.forEach((message) => report(errors, path, `Front matter: ${message}`));
  frontWarnings.forEach((message) => report(warnings, path, `Front matter: ${message}`));
  if (frontErrors.length) continue;

  const { preamble, sections } = splitSections(body);
  if (preamble) {
    report(warnings, path, 'There is text before the first "##" heading. Move it into a section.');
  }
  checkOutline(
    sections.map((section) => section.title),
    CHAPTER_SECTIONS[entry.part],
  ).forEach((message) => report(warnings, path, message));
}

const print = (label, list) =>
  list.forEach(({ file, message }) => console.log(`${label} ${file}\n  ${message}\n`));
print("Warning:", warnings);
print("Error:", errors);

const summary = `Chapter check: ${found.length} files, ${errors.length} error(s), ${warnings.length} warning(s).`;
if (errors.length) {
  console.error(`${summary} Fix the errors above.`);
  process.exit(1);
}
console.log(summary);

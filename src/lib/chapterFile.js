// Parsing of chapter Markdown files (src/content/chapters/<part>/<id>.md).
// Plain JavaScript with no Vite or browser features, so the same code runs in
// the site (pages/ChapterPage.jsx) and in the build check
// (scripts/check-chapters.mjs).

export const CHAPTER_DIR = "src/content/chapters";
export const STATUSES = ["draft", "ready"];
export const PLACEHOLDER = "To be written.";

// Repo-relative path of a chapter's file.
export const chapterPath = (part, id) => `${CHAPTER_DIR}/${part}/${id}.md`;

const unquote = (value) => {
  const v = value.trim();
  if (v.length >= 2 && (v[0] === '"' || v[0] === "'") && v.at(-1) === v[0]) return v.slice(1, -1);
  return v;
};

// Drop a trailing " # comment" (not inside quotes).
const stripComment = (value) => {
  let quote = null;
  for (let i = 0; i < value.length; i += 1) {
    const c = value[i];
    if (quote) {
      if (c === quote) quote = null;
    } else if (c === '"' || c === "'") {
      quote = c;
    } else if (c === "#" && (i === 0 || /\s/.test(value[i - 1]))) {
      return value.slice(0, i).trimEnd();
    }
  }
  return value.trimEnd();
};

// Parse the front matter block, which has one fixed shape:
//
//   ---
//   status: draft
//   contributors:
//     - name: Jane Doe
//       role: Researcher, Example University
//   ---
//
// (or `contributors: []`). Returns { data, body, errors, warnings }; errors
// and warnings are plain-language messages. Never throws.
export function parseChapterFile(text) {
  const errors = [];
  const warnings = [];
  const data = { status: "draft", contributors: [] };
  const lines = text.replace(/^﻿/, "").replace(/\r\n?/g, "\n").split("\n");

  if (lines[0].trim() !== "---") {
    errors.push(
      'The file must start with a front matter block: a line "---", the fields, then another "---".',
    );
    return { data, body: lines.join("\n"), errors, warnings };
  }
  const end = lines.findIndex((line, i) => i > 0 && line.trim() === "---");
  if (end === -1) {
    errors.push('The front matter block is not closed. Add a line with just "---" after the last field.');
    return { data, body: "", errors, warnings };
  }

  let list = null; // the open "contributors:" list
  let item = null; // the contributor being read
  const seen = new Set();

  for (let i = 1; i < end; i += 1) {
    const lineNo = i + 1;
    const raw = stripComment(lines[i]);
    if (!raw.trim()) continue;
    const indent = raw.length - raw.trimStart().length;
    const line = raw.trim();

    if (indent === 0) {
      list = null;
      item = null;
      const m = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
      if (!m) {
        errors.push(`Line ${lineNo} ("${line}") is not a "field: value" line.`);
        continue;
      }
      const [, key, value] = m;
      if (seen.has(key)) errors.push(`Line ${lineNo}: the field "${key}" appears twice. Keep one.`);
      seen.add(key);
      if (key === "status") {
        const status = unquote(value);
        if (!STATUSES.includes(status)) {
          errors.push(`Line ${lineNo}: status is "${status}". It must be "draft" or "ready".`);
        } else {
          data.status = status;
        }
      } else if (key === "contributors") {
        if (value === "[]") continue;
        if (value !== "") {
          errors.push(
            `Line ${lineNo}: write "contributors: []" for none, or "contributors:" followed by "  - name: ..." lines.`,
          );
          continue;
        }
        list = data.contributors;
      } else {
        warnings.push(`Line ${lineNo}: unknown field "${key}" is ignored. Use "status" and "contributors".`);
      }
      continue;
    }

    if (!list) {
      errors.push(`Line ${lineNo} ("${line}") is indented but does not belong to "contributors:".`);
      continue;
    }
    const isNew = line.startsWith("- ");
    const m = (isNew ? line.slice(2).trim() : line).match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!m) {
      errors.push(`Line ${lineNo} ("${line}") should look like "- name: Jane Doe" or "role: Researcher".`);
      continue;
    }
    if (isNew) {
      item = {};
      list.push(item);
    } else if (!item) {
      errors.push(`Line ${lineNo}: start each contributor with "- name: ...".`);
      continue;
    }
    const [, key, value] = m;
    if (key !== "name" && key !== "role") {
      warnings.push(`Line ${lineNo}: unknown contributor field "${key}" is ignored. Use "name" and "role".`);
      continue;
    }
    item[key] = unquote(value);
  }

  data.contributors.forEach((person, index) => {
    if (!person.name) errors.push(`Contributor ${index + 1} has no name. Add "name: ..." to it.`);
  });
  data.contributors = data.contributors.filter((person) => person.name);

  return { data, body: lines.slice(end + 1).join("\n"), errors, warnings };
}

// Split a chapter body at its "## " headings (outside code blocks). Returns
// { preamble, sections: [{ title, body }] }; preamble is any text before the
// first heading.
export function splitSections(body) {
  const sections = [];
  const preamble = [];
  let current = null;
  let fence = null;

  for (const line of body.split("\n")) {
    const fenceMatch = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (fenceMatch) {
      if (!fence) fence = fenceMatch[1][0];
      else if (fenceMatch[1][0] === fence) fence = null;
    }
    const heading = !fence && line.match(/^##\s+(.+?)\s*#*\s*$/);
    if (heading) {
      current = { title: heading[1], lines: [] };
      sections.push(current);
    } else {
      (current ? current.lines : preamble).push(line);
    }
  }

  return {
    preamble: preamble.join("\n").trim(),
    sections: sections.map(({ title, lines }) => ({ title, body: lines.join("\n").trim() })),
  };
}

// True for a section that has not been written yet.
export const isPlaceholder = (body) => body === "" || body === PLACEHOLDER;

// Compare a file's headings with its part's outline. Returns plain-language
// warnings: headings not in the outline, outline headings missing from the
// file, and outline headings out of order.
export function checkOutline(titles, outline) {
  const warnings = [];
  titles
    .filter((title) => !outline.includes(title))
    .forEach((title) =>
      warnings.push(
        `Heading "## ${title}" is not in this part's outline. Rename it to one of: ${outline
          .map((t) => `"${t}"`)
          .join(", ")}; or ask in your issue if a new section is needed.`,
      ),
    );
  outline
    .filter((title) => !titles.includes(title))
    .forEach((title) => warnings.push(`Heading "## ${title}" is missing. Add it back, with "${PLACEHOLDER}" if it is empty.`));
  const duplicates = titles.filter((title, i) => titles.indexOf(title) !== i);
  [...new Set(duplicates)].forEach((title) =>
    warnings.push(`Heading "## ${title}" appears more than once. Merge the sections into one.`),
  );

  const known = [...new Set(titles.filter((title) => outline.includes(title)))];
  const expected = outline.filter((title) => known.includes(title));
  if (known.join("\n") !== expected.join("\n")) {
    warnings.push(
      `The sections are out of order. Put them in this order: ${expected.map((t) => `"${t}"`).join(", ")}.`,
    );
  }
  return warnings;
}

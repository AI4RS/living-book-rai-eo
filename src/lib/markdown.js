import { Marked } from "marked";

// Markdown to HTML for chapter text, styled by the .chapter-prose class in
// index.css.
//   - "###" inside a section renders one level down (h4), since the chapter
//     title is h2 and each "##" section label is h3.
//   - Figures written as figures/<part>/<id>/name.png (files in public/figures)
//     get the site's base path, so they load locally and on GitHub Pages.
//   - Links to other sites open in a new tab.
//   - Raw HTML is shown as text, not rendered.
const BASE = import.meta.env.BASE_URL;

const escape = (text) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const safeHref = (href) => (/^\s*(javascript|data|vbscript):/i.test(href) ? "#" : href);

const withBase = (href) => {
  const m = href.match(/^(?:\.\/|\/)?(figures\/.*)$/);
  return m ? `${BASE}${m[1]}` : href;
};

const marked = new Marked({
  gfm: true,
  walkTokens(token) {
    if (token.type === "image") token.href = withBase(token.href);
  },
  renderer: {
    heading({ tokens, depth }) {
      const level = Math.min(depth + 1, 6);
      return `<h${level}>${this.parser.parseInline(tokens)}</h${level}>\n`;
    },
    link({ href, title, tokens }) {
      const external = /^https?:\/\//i.test(href);
      return `<a href="${escape(safeHref(href))}"${title ? ` title="${escape(title)}"` : ""}${
        external ? ' target="_blank" rel="noopener noreferrer"' : ""
      }>${this.parser.parseInline(tokens)}</a>`;
    },
    html({ text }) {
      return escape(text);
    },
  },
});

// Wide tables scroll sideways inside their own box instead of the page.
export const renderMarkdown = (text) =>
  marked
    .parse(text)
    .replace(/<table>/g, '<div class="table-scroll"><table>')
    .replace(/<\/table>/g, "</table></div>");

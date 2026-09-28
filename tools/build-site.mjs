#!/usr/bin/env node
// Builds one crawlable HTML page per document and language, plus sitemap.xml,
// robots.txt and (when configured) ads.txt and CNAME, from the Markdown in content/.
//
//   node tools/build-site.mjs          write the pages
//   node tools/build-site.mjs --check  fail if any page is missing or out of date
//
// Settings live in site.config.json. Change siteUrl when the custom domain is connected,
// and set adsensePublisherId ("pub-…") to add the AdSense code and ads.txt.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const MANIFEST = "tools/site/generated.json";
const read = (file) => fs.readFileSync(path.join(ROOT, file), "utf8");
const check = process.argv.includes("--check");
const config = JSON.parse(read("site.config.json"));
const siteUrl = config.siteUrl.endsWith("/") ? config.siteUrl : config.siteUrl + "/";

const routes = (() => {
  const context = {};
  vm.createContext(context);
  vm.runInContext(
    read("assets/app.js").split("const $ =")[0] +
      ";globalThis.__routes = { DOCS, SITE_PAGES, pageHref };",
    context,
  );
  return context.__routes;
})();
const UI = (() => {
  const context = { window: {} };
  vm.runInNewContext(read("assets/i18n.js"), context);
  return context.window.UI_TEXT;
})();
const marked = (() => {
  const context = { module: { exports: {} } };
  context.exports = context.module.exports;
  vm.runInNewContext(read("assets/vendor/marked.min.js"), context);
  return context.module.exports;
})();
const template = read("tools/site/template.html");
const { DOCS, SITE_PAGES, pageHref } = routes;
const LANGS = ["ko", "en"];

const escapeHtml = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
const plain = (markdown) =>
  markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
const sourceFile = (docPath, lang) =>
  lang === "en" ? docPath.replace(/^content\//, "content/en/") : docPath;
const absolute = (href) => new URL(href, siteUrl).href;
const rootPrefix = (href) => "../".repeat(href.split("/").filter(Boolean).length) || "./";
const noindex = (docPath) => (config.noindexPrefixes || []).some((p) => docPath.startsWith(p));
const publisherId = (() => {
  const id = String(config.adsensePublisherId || "").trim().replace(/^ca-/, "");
  if (!id) return "";
  if (!/^pub-\d{10,20}$/.test(id)) throw new Error("adsensePublisherId must look like pub-1234567890123456");
  return id;
})();

function contactMarkdown(lang) {
  const lines = [];
  if (config.contactEmail)
    lines.push(
      (lang === "en" ? "- Email: " : "- 이메일: ") +
        `[${config.contactEmail}](mailto:${config.contactEmail})`,
    );
  if (config.githubProfile)
    lines.push((lang === "en" ? "- GitHub: " : "- GitHub: ") + `[${config.githubProfile}](${config.githubProfile})`);
  return lines.join("\n");
}

function description(markdown) {
  const parts = [];
  for (const block of markdown.split(/\r?\n\s*\r?\n/).slice(1)) {
    const text = block.trim();
    if (!text) continue;
    if (/^#{1,6} /.test(text)) {
      if (parts.length) break;
      continue;
    }
    if (/^(>|\||```|<|- |\* |\d+\. )/.test(text)) continue;
    if (/^(기준일|시행일|Reference date|Effective date)\s*:/i.test(text)) continue;
    parts.push(plain(text));
    if (parts.join(" ").length >= 90) break;
  }
  const joined = parts.join(" ");
  return joined.length > 155 ? joined.slice(0, 154).trimEnd() + "…" : joined;
}

function treeHtml(lang, activePath, root) {
  const ui = UI[lang];
  const activeGroup = DOCS.findIndex((g) => g.items.some(([, p]) => p === activePath));
  const icons = ["book", "cube", "layout-grid", "users", "speakerphone", "cloud-upload", "briefcase"];
  return DOCS.map((group, g) => {
    const expanded = g === activeGroup;
    const links = group.items
      .map(([, p], i) => {
        const active = p === activePath;
        return (
          `<a class="tree-link${active ? " active" : ""}" ${active ? 'aria-current="page" ' : ""}` +
          `href="${root}${pageHref(p, lang)}" data-path="${escapeHtml(p)}">${escapeHtml(ui.titles[g][i])}</a>`
        );
      })
      .join("");
    return (
      `<div class="tree-group${expanded ? "" : " closed"}" data-group="${g}">` +
      `<button aria-expanded="${expanded}" aria-controls="group-${g}">` +
      `<img src="${root}assets/icons/${icons[g]}.svg" alt="" aria-hidden="true">` +
      `<span>${escapeHtml(ui.groups[g])}</span>` +
      `<img class="chevron" src="${root}assets/icons/chevron-down.svg" alt=""></button>` +
      `<div class="tree-items" id="group-${g}">${links}</div></div>`
    );
  }).join("");
}

function pageNavHtml(lang, docPath, root) {
  const ui = UI[lang];
  const flat = DOCS.flatMap((g, gi) => g.items.map(([, p], i) => ({ p, title: ui.titles[gi][i] })));
  const at = flat.findIndex((d) => d.p === docPath);
  if (at < 0) return "";
  return [
    [-1, "previous", "arrow-left"],
    [1, "next", "arrow-right"],
  ]
    .map(([step, key, arrow]) => {
      const doc = flat[at + step];
      if (!doc) return "";
      const img = `<img src="${root}assets/icons/${arrow}.svg" alt="" aria-hidden="true">`;
      return (
        `<a class="page-link ${step === 1 ? "next" : "previous"}" href="${root}${pageHref(doc.p, lang)}">` +
        (step === -1 ? img : "") +
        `<span><small>${escapeHtml(ui[key])}</small>${escapeHtml(doc.title)}</span>` +
        (step === 1 ? img : "") +
        "</a>"
      );
    })
    .join("");
}

function homeHtml(lang, root) {
  const ui = UI[lang];
  const groups = DOCS.map((group, g) => {
    const items = group.items
      .map(([, p], i) => `<li><a href="${root}${pageHref(p, lang)}">${escapeHtml(ui.titles[g][i])}</a></li>`)
      .join("");
    return (
      `<section class="home-group"><h2>${escapeHtml(ui.groups[g])}</h2>` +
      `<p>${escapeHtml(ui.groupIntros[g])}</p><ul>${items}</ul></section>`
    );
  }).join("");
  return (
    `<h1>${escapeHtml(ui.homeTitle)}</h1><p class="home-lead">${escapeHtml(ui.homeLead)}</p>` +
    `<div class="home-groups">${groups}</div>`
  );
}

function footerLinks(lang, root) {
  const ui = UI[lang];
  return [
    ["", ui.home],
    [SITE_PAGES[0], ui.about],
    [SITE_PAGES[1], ui.privacy],
    [SITE_PAGES[2], ui.contact],
  ]
    .map(([p, label]) => `<a href="${root}${pageHref(p, lang)}">${escapeHtml(label)}</a>`)
    .join("");
}

function render(page) {
  const { lang, docPath } = page;
  const ui = UI[lang];
  const href = pageHref(docPath, lang);
  const root = rootPrefix(href);
  const groupIndex = DOCS.findIndex((g) => g.items.some(([, p]) => p === docPath));
  const itemIndex = groupIndex >= 0 ? DOCS[groupIndex].items.findIndex(([, p]) => p === docPath) : -1;
  const navTitle = groupIndex >= 0 ? ui.titles[groupIndex][itemIndex] : "";
  let content, title, desc, busy = "false", prerendered = "true";

  if (!docPath) {
    content = homeHtml(lang, root);
    title = `${config.siteName} · ${ui.tagline}`;
    desc = ui.homeLead;
  } else if (docPath.startsWith("@")) {
    content = `<p class="loading" role="status">${escapeHtml(ui.loading)}</p>`;
    title = `${navTitle} · AI Map | ${config.siteName}`;
    desc = `${ui.groups[groupIndex]} · ${navTitle}`;
    busy = "true";
    prerendered = "false";
  } else {
    let markdown = read(sourceFile(docPath, lang));
    markdown = markdown.replace("{{contact}}", contactMarkdown(lang));
    const h1 = plain((markdown.match(/^# (.+)$/m) || [, navTitle])[1]);
    content = marked.parse(markdown, { gfm: true, breaks: false });
    title = `${h1} | ${config.siteName}`;
    desc = description(markdown) || h1;
  }

  const chevron = `<img src="${root}assets/icons/chevron-right.svg" alt="" aria-hidden="true">`;
  const breadcrumb =
    groupIndex >= 0
      ? `<span>${escapeHtml(ui.groups[groupIndex])}</span>${chevron}<span>${escapeHtml(navTitle)}</span>`
      : `<span>${escapeHtml(docPath ? title.split(" | ")[0] : ui.home)}</span>`;
  const alternates = [
    ...LANGS.map((l) => [l, absolute(pageHref(docPath, l))]),
    ["x-default", absolute(pageHref(docPath, "ko"))],
  ]
    .map(([l, url]) => `    <link rel="alternate" hreflang="${l}" href="${url}" />`)
    .join("\n");
  const adsense = publisherId
    ? `    <meta name="google-adsense-account" content="ca-${publisherId}" />\n` +
      `    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${publisherId}" crossorigin="anonymous"></script>`
    : "";
  const values = {
    lang,
    title: escapeHtml(title),
    description: escapeHtml(desc),
    robots: noindex(docPath) ? "noindex,follow" : "index,follow",
    canonical: absolute(href),
    alternates,
    ogType: docPath ? "article" : "website",
    ogLocale: lang === "en" ? "en_US" : "ko_KR",
    siteName: escapeHtml(config.siteName),
    root,
    docPath: escapeHtml(docPath),
    adsense,
    homeHref: root + pageHref("", lang),
    koPressed: String(lang === "ko"),
    enPressed: String(lang === "en"),
    tree: treeHtml(lang, docPath, root),
    breadcrumb,
    busy,
    prerendered,
    content,
    pageNav: pageNavHtml(lang, docPath, root),
    footerLinks: footerLinks(lang, root),
  };
  const html = template
    .replace(/\{\{t:(\w+)\}\}/g, (_, key) => {
      if (!(key in ui)) throw new Error("Missing UI text: " + key);
      return escapeHtml(ui[key]);
    })
    .replace(/\{\{(\w+)\}\}/g, (_, key) => {
      if (!(key in values)) throw new Error("Missing template value: " + key);
      return values[key];
    });
  return { file: href + "index.html", html, indexable: !noindex(docPath), docPath };
}

const pages = [];
for (const lang of LANGS) {
  pages.push({ lang, docPath: "" });
  for (const group of DOCS) for (const [, docPath] of group.items) pages.push({ lang, docPath });
  for (const docPath of SITE_PAGES) pages.push({ lang, docPath });
}
const outputs = new Map();
const rendered = pages.map(render);
for (const page of rendered) outputs.set(page.file, page.html);

const byPath = new Map();
for (const page of rendered.filter((p) => p.indexable)) {
  if (!byPath.has(page.docPath)) byPath.set(page.docPath, true);
}
const sitemapEntries = [...byPath.keys()].flatMap((docPath) =>
  LANGS.map((lang) => {
    const links = LANGS.map(
      (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absolute(pageHref(docPath, l))}"/>`,
    ).join("\n");
    return `  <url>\n    <loc>${absolute(pageHref(docPath, lang))}</loc>\n${links}\n  </url>`;
  }),
);
outputs.set(
  "sitemap.xml",
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    sitemapEntries.join("\n") +
    "\n</urlset>\n",
);
const base = new URL(siteUrl).pathname;
const blocked = [
  ".ai/", ".agents/", ".claude/", ".codex/", "content/", "docs/", "tests/", "tools/",
  "AGENTS.md", "CLAUDE.md", "LESSONS_FROM_PRACTICE.md", "README.md", "site.config.json",
];
// robots.txt and ads.txt only take effect at the root of the domain (the custom domain).
outputs.set(
  "robots.txt",
  "User-agent: *\n" +
    blocked.map((p) => `Disallow: ${base}${p}`).join("\n") +
    `\nAllow: ${base}\n\nSitemap: ${siteUrl}sitemap.xml\n`,
);
if (publisherId) outputs.set("ads.txt", `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`);
const host = new URL(siteUrl).hostname;
if (!host.endsWith(".github.io")) outputs.set("CNAME", host + "\n");
outputs.set(".nojekyll", "");

const previous = fs.existsSync(path.join(ROOT, MANIFEST)) ? JSON.parse(read(MANIFEST)) : [];
const current = [...outputs.keys()].sort();
const manifest = JSON.stringify(current, null, 2) + "\n";
const orphans = previous.filter((file) => !outputs.has(file));

if (check) {
  const problems = [];
  for (const [file, html] of outputs) {
    const full = path.join(ROOT, file);
    if (!fs.existsSync(full)) problems.push("missing  " + file);
    else if (fs.readFileSync(full, "utf8") !== html) problems.push("stale    " + file);
  }
  for (const file of orphans) if (fs.existsSync(path.join(ROOT, file))) problems.push("orphan   " + file);
  if (!fs.existsSync(path.join(ROOT, MANIFEST)) || read(MANIFEST) !== manifest) problems.push("stale    " + MANIFEST);
  if (problems.length) {
    console.error(problems.join("\n") + "\n\nRun: node tools/build-site.mjs");
    process.exit(1);
  }
  console.log(`site is up to date (${outputs.size} files)`);
} else {
  for (const [file, html] of outputs) {
    const full = path.join(ROOT, file);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, html);
  }
  for (const file of orphans) {
    const full = path.join(ROOT, file);
    if (fs.existsSync(full)) fs.rmSync(full);
    let dir = path.dirname(full);
    while (dir !== ROOT && fs.existsSync(dir) && fs.readdirSync(dir).length === 0) {
      fs.rmdirSync(dir);
      dir = path.dirname(dir);
    }
  }
  fs.writeFileSync(path.join(ROOT, MANIFEST), manifest);
  console.log(`wrote ${outputs.size} files` + (orphans.length ? `, removed ${orphans.length}` : ""));
}

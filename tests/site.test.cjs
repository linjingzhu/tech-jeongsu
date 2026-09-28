const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { execFileSync } = require("node:child_process");
const root = path.resolve(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const context = {};
vm.createContext(context);
vm.runInContext(
  read("assets/app.js").split("const $ =")[0] + ";globalThis.r = { DOCS, SITE_PAGES, pageHref };",
  context,
);
const { DOCS, SITE_PAGES, pageHref } = context.r;
const config = JSON.parse(read("site.config.json"));
const docPaths = DOCS.flatMap((g) => g.items.map(([, p]) => p));
const pagesFor = (lang) => ["", ...docPaths, ...SITE_PAGES].map((p) => [p, pageHref(p, lang) + "index.html"]);

test("generated pages are up to date with the Markdown, templates and config", () => {
  execFileSync(process.execPath, ["tools/build-site.mjs", "--check"], { cwd: root, stdio: "pipe" });
});

test("every page has its own address, title, description, canonical URL and language alternates", () => {
  const seen = new Set();
  for (const lang of ["ko", "en"])
    for (const [docPath, file] of pagesFor(lang)) {
      const html = read(file);
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
      assert.ok(canonical && !seen.has(canonical), file + ": unique canonical");
      seen.add(canonical);
      assert.match(html, new RegExp('<html lang="' + lang + '">'), file);
      assert.match(html, /<title>[^<]{5,}<\/title>/, file + ": title");
      assert.match(html, /<meta name="description" content="[^"]{10,}"/, file + ": description");
      assert.match(html, /hreflang="ko"[\s\S]*hreflang="en"[\s\S]*hreflang="x-default"/, file);
      assert.ok(!html.includes("{{"), file + ": unfilled placeholder");
      if (docPath.startsWith("content/")) {
        const md = read(lang === "en" ? docPath.replace("content/", "content/en/") : docPath);
        const h1 = md.match(/^# (.+)$/m)[1].replace(/[*`_]/g, "");
        const rendered = (html.match(/<h1>([\s\S]*?)<\/h1>/)?.[1] || "")
          .replace(/<[^>]+>/g, "")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");
        assert.ok(html.includes('data-prerendered="true"'), file + ": prerendered");
        assert.equal(rendered, h1, file + ": article body is in the HTML");
      }
    }
});

test("every page links to the about, privacy and contact pages", () => {
  for (const lang of ["ko", "en"])
    for (const [, file] of pagesFor(lang)) {
      const footer = read(file).match(/<footer class="site-footer">([\s\S]*?)<\/footer>/)?.[1] || "";
      for (const page of SITE_PAGES)
        assert.ok(footer.includes(pageHref(page, lang) + '"'), file + ": footer links " + page);
    }
});

test("site pages exist in both languages with matching structure", () => {
  for (const page of SITE_PAGES) {
    const ko = read(page),
      en = read(page.replace("content/", "content/en/"));
    const headings = (text) => [...text.matchAll(/^(#{1,6}) /gm)].map((m) => m[1]);
    assert.deepEqual(headings(en), headings(ko), page);
    assert.ok(!/[가-힣]/.test(en), page + ": untranslated Korean");
  }
  const privacy = read("content/site/privacy.md") + read("content/en/site/privacy.md");
  assert.ok(privacy.includes("policies.google.com/technologies/partner-sites"), "Google partner-sites link");
  assert.ok(/cookie|쿠키/i.test(privacy), "cookie disclosure");
});

test("replicated AI Map views stay out of the index and the sitemap", () => {
  const sitemap = read("sitemap.xml");
  for (const lang of ["ko", "en"])
    for (const [docPath, file] of pagesFor(lang)) {
      const html = read(file);
      const url = new URL(pageHref(docPath, lang), config.siteUrl).href;
      const hidden = (config.noindexPrefixes || []).some((p) => docPath.startsWith(p));
      assert.equal(html.includes('content="noindex,follow"'), hidden, file);
      assert.equal(sitemap.includes("<loc>" + url + "</loc>"), !hidden, file + " in sitemap");
    }
  assert.match(read("robots.txt"), /Sitemap: .+sitemap\.xml/);
});

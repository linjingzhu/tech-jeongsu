const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
function loadGlobal(file, name) {
  const context = { window: {} };
  vm.runInNewContext(read(file), context);
  return JSON.parse(JSON.stringify(context.window[name]));
}
const ko = loadGlobal("assets/ai-map-data.js", "AI_MAP_DATA");
const en = loadGlobal("assets/ai-map-data.en.js", "AI_MAP_DATA_EN");
const ui = loadGlobal("assets/i18n.js", "UI_TEXT");
const docs = vm.runInNewContext(
  read("assets/app.js").split("const $ =")[0] + "; JSON.stringify(DOCS)",
);
const routes = JSON.parse(docs);
test("all original routes have bilingual navigation and all documents have English equivalents", () => {
  routes.forEach((group, g) => {
    assert.equal(group.items.length, ui.ko.titles[g].length);
    assert.equal(group.items.length, ui.en.titles[g].length);
    group.items
      .filter(([, p]) => p.startsWith("content/"))
      .forEach(([, p]) => {
        const original = read(p),
          translated = read(p.replace("content/", "content/en/"));
        const headings = (text) => [...text.matchAll(/^(#{1,6}) /gm)].map((m) => m[1]);
        const fences = (text) => text.split(/\r?\n/).filter((line) => line.startsWith("```"));
        assert.deepEqual(headings(translated), headings(original), p + ": heading hierarchy");
        assert.deepEqual(fences(translated), fences(original), p + ": code languages and fences");
        assert.ok(!/[가-힣]/.test(translated), p + ": untranslated Korean");
      });
  });
});
test("catalog translations preserve identity, links, chronological data and schema", () => {
  const exactKeys = new Set([
    "id",
    "category",
    "source",
    "importedAt",
    "lastUpdated",
    "date",
    "url",
    "sourceUrl",
    "webUrl",
    "downloadUrl",
  ]);
  function compare(a, b, key = "") {
    assert.equal(typeof b, typeof a, key);
    if (Array.isArray(a)) {
      assert.equal(b.length, a.length, key);
      a.forEach((v, i) => compare(v, b[i], key));
    } else if (a && typeof a === "object") {
      assert.deepEqual(Object.keys(b), Object.keys(a), key);
      Object.keys(a).forEach((k) => compare(a[k], b[k], k));
    } else if (exactKeys.has(key) && !/[가-힣]/.test(String(a))) assert.deepEqual(b, a, key);
  }
  compare(ko, en);
  assert.deepEqual(
    [ko.categories.length, ko.tools.length, ko.guides.length, ko.news.length],
    [7, 136, 4, 12],
  );
  assert.ok(!/[가-힣]/.test(JSON.stringify(en)));
});
test("workflow guides keep every step's summary, output and completion line in both languages", () => {
  for (const data of [ko, en]) {
    const flows = data.guides.filter((g) => ["image-workflow", "coding-workflow"].includes(g.id));
    assert.equal(flows.length, 2);
    flows.forEach((g) => {
      assert.ok(g.finish, g.id + ": finish");
      g.sections.forEach((s) => assert.ok(s.summary && s.output, g.id + ": " + s.heading));
    });
  }
});
test("all local entry-point assets exist and both locales expose the same interface strings", () => {
  const html = read("index.html");
  for (const [, asset] of html.matchAll(/(?:src|href)="\.\/([^"#]+)"/g))
    assert.ok(fs.existsSync(path.join(root, asset.split("?")[0])), asset);
  assert.deepEqual(Object.keys(ui.en), Object.keys(ui.ko));
  assert.ok(!html.includes("repo-link"));
});
test("English diagrams preserve graph connections and identifiers", () => {
  const normalize = (text) =>
    text
      .replace(/\[[^\]\n]*\]/g, "[]")
      .replace(/\{[^}\n]*\}/g, "{}")
      .replace(/\|[^|\n]*\|/g, "||")
      .replace(/"[^"\n]*"/g, '""')
      .replace(/<br\s*\/?\s*>/g, "")
      .replace(/%%[^\n]*/g, "")
      .trim();
  routes
    .flatMap((g) => g.items)
    .filter(([, p]) => p.startsWith("content/"))
    .forEach(([, p]) => {
      const extract = (text) =>
        [...text.matchAll(/```mermaid\r?\n([\s\S]*?)```/g)].map((m) => m[1]);
      const original = extract(read(p)),
        translated = extract(read(p.replace("content/", "content/en/")));
      assert.equal(original.length, translated.length, p);
      original.forEach((graph, i) => {
        const connections = (text) =>
          normalize(text)
            .split(/\r?\n/)
            .filter((l) => /-->|---|==>|-\.->/.test(l))
            .map((l) => l.trim().replace(/\s+/g, " "));
        assert.deepEqual(connections(graph), connections(translated[i]), p + ": edges");
      });
    });
});

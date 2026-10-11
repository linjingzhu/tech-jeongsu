#!/usr/bin/env node
// Check every external URL in the Markdown content and the AI Map data.
// Run it from a normal network, not a restricted sandbox:
//   node tools/check-links.mjs            # report broken links
//   node tools/check-links.mjs --all      # also list the ones that worked
// Exit status is 1 when any link is broken, so it can gate a local pre-merge check.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const showAll = process.argv.includes("--all");
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith(".md")) files.push(path);
  }
})(join(root, "content"));
files.push(join(root, "assets/ai-map-data.js"), join(root, "assets/ai-map-data.en.js"));

const where = new Map();
for (const file of files) {
  const text = readFileSync(file, "utf8").replace(/```[\s\S]*?```/g, "");
  text.split("\n").forEach((line, i) => {
    for (const [url] of line.matchAll(/https?:\/\/[^\s)"'<>`\]]+/g)) {
      const clean = url.replace(/[.,;:]+$/, "");
      if (!where.has(clean)) where.set(clean, []);
      where.get(clean).push(`${file.slice(root.length)}:${i + 1}`);
    }
  });
}

async function check(url) {
  const opts = { redirect: "follow", signal: AbortSignal.timeout(20000), headers: { "user-agent": "Mozilla/5.0 (MyAI link check)" } };
  try {
    let res = await fetch(url, { ...opts, method: "HEAD" });
    // Many sites refuse HEAD or bot user agents; confirm with GET before calling it broken.
    if (res.status >= 400) res = await fetch(url, { ...opts, method: "GET" });
    return { status: res.status, final: res.url };
  } catch (error) {
    return { status: 0, final: String(error.cause?.code || error.name) };
  }
}

const urls = [...where.keys()].sort();
const results = [];
for (let i = 0; i < urls.length; i += 16) {
  const batch = urls.slice(i, i + 16);
  results.push(...(await Promise.all(batch.map(async (url) => ({ url, ...(await check(url)) })))));
  process.stderr.write(`\r${Math.min(i + 16, urls.length)}/${urls.length}`);
}
process.stderr.write("\n");

// 401/403/429 usually mean a login wall, bot protection or rate limiting rather than a dead page.
const suspect = (s) => s === 401 || s === 403 || s === 429;
const broken = results.filter((r) => r.status === 0 || (r.status >= 400 && !suspect(r.status)));
const blocked = results.filter((r) => suspect(r.status));
for (const r of broken) console.log(`BROKEN ${r.status} ${r.url}\n  -> ${r.final}\n  in ${where.get(r.url).join(", ")}`);
for (const r of blocked) console.log(`CHECK BY HAND ${r.status} ${r.url}\n  in ${where.get(r.url)[0]}`);
if (showAll) for (const r of results.filter((x) => x.status && x.status < 400)) console.log(`ok ${r.status} ${r.url}`);
console.log(`\n${urls.length} URLs: ${broken.length} broken, ${blocked.length} to check by hand.`);
process.exit(broken.length ? 1 : 0);

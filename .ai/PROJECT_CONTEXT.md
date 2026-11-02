---
doc_id: ai-project-context
version: 1.0.0
canonical_path: .ai/PROJECT_CONTEXT.md
updated: 2026-11-02
---

# MyAI (tech-jeongsu) Context

The only file in `.ai/` allowed to know what the project is; every other
document survives being copied elsewhere because this one exists.

## repository_mode

```text
repository_mode: protected
```

## Facts the checks read

```text
base_branch: stable
merge_deploys: yes
runtime_gate: serve the repository's parent folder over HTTP, open /tech-jeongsu/, and check menu, table of contents, search and the ko/en switch at desktop, tablet and mobile widths
test_command: node --test tests/content.test.cjs tests/search.test.cjs tests/site.test.cjs && node tools/build-site.mjs --check
lint_command: none
build_command: node tools/build-site.mjs
generated: document pages, sitemap.xml, robots.txt, .nojekyll (ads.txt, CNAME once configured) ← content/, tools/site/template.html, site.config.json : node tools/build-site.mjs
external_scripts: fonts.googleapis.com, fonts.gstatic.com : every page; pagead2.googlesyndication.com : only once adsensePublisherId is set in site.config.json
public_ids: AdSense publisher id (pub-…) in site.config.json, once set
owner_ledger: .ai/reports/OWNER_ACTIONS.md
```

## Authoritative product constraints

- A static technical-documentation site in Korean and English: AI usage, Git,
  product planning and operation, AI Map, Marketing, Platform deployment and
  services, Business. Published at https://linjingzhu.github.io/tech-jeongsu/.
- Every document has its own address with its body pre-rendered to HTML;
  Korean at the root, English under `en/`. Both languages keep the same
  heading hierarchy and Mermaid nodes and links.
- Search runs in the browser: it never sends the query to a server.
- Business documents are general information, not legal or tax advice.
- The AI Map screens mirror `linjingzhu/ai-map`, so they stay `noindex` and
  out of the sitemap (`noindexPrefixes` in `site.config.json`).

## Current architecture

- Markdown in `content/` (Korean) and `content/en/` (English); `assets/app.js`
  lists the documents, `assets/i18n.js` the translated interface copy,
  `assets/ai-map-data*.js` the AI Map data.
- `tools/build-site.mjs` renders every page from the Markdown,
  `tools/site/template.html` and `site.config.json`. Generated files are
  committed; `--check` and the tests catch a stale build.
- GitHub Pages publishes the root of `stable` as is, with `.nojekyll`. There
  is no server build and no Actions workflow.
- Runtime libraries are pinned under `assets/vendor/`.

## Current development slice

- Preparing for an AdSense application: the code side is done; the remaining
  steps are the owner's (`.ai/reports/OWNER_ACTIONS.md`).

## Permanently excluded scope

- No secrets anywhere in the repository: with `.nojekyll`, dot-folders such as
  `.ai/` and `.claude/` are served publicly too.
- No server-side search or analytics on search queries.

## Local rules

- Never edit a generated file by hand; change its source and rebuild.
- When a style or script file changes, bump the `v` value on its asset URL in
  `tools/site/template.html` and rebuild, so a cached copy is not served.

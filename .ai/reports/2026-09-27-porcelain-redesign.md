# Porcelain documentation redesign

## Outcome

Implemented the user-selected Porcelain Index direction for the existing static site. Added bilingual navigation and full English counterparts for 28 Markdown documents and the AI Map catalog; retained all 38 routes and existing Korean content, with the requested practical PM / Project Manager comparison added to PO role comparison.

The header now has Korean / English controls. Document search, tree navigation, a left internal TOC and a right tick-only reading navigator support desktop and drawer-based mobile navigation. Tables, syntax-highlighted copyable code blocks, cards and original Mermaid graphs share the light visual system. Existing GitHub Pages deployment remains unchanged.

## Verification

- Automated content, catalog schema/identity, assets and Mermaid topology tests: 4/4 passed.
- Browser audit: all 38 routes in both languages rendered without document/diagram errors or horizontal page overflow.
- Visual QA: source and render combined at normalized size; focused comparison plus desktop, tablet and phone captures. Earlier graph sizing, tick density and anchor-offset issues corrected. Final local design QA passed.
- Functional checks: language persistence, document/catalog search and empty states, copy success, TOC/reading position, mobile drawers, Escape, keyboard focus and active group restoration.
- Independent GPT-6 Sol review: PASS after search expansion and drawer focus fixes.
- No build step required. Locally vendored scripts and licenses preserve the static delivery model.

## Evidence and limits

The local root design-qa.md and sibling design-evidence directory retain detailed screenshots and comparison history; generated images are not committed as public repository assets. The source mock simplifies content, so preserved graph topology and complete article text intentionally change above-the-fold density.

Not separately verified: Safari/Firefox, screen-reader sessions, browser zoom, disconnected network behavior, and all existing external catalog claims. Newly added role descriptions cite official Atlassian, PMI and Scrum Guide sources. Deployment verification is reported after the existing Pages release completes.

## Authority

The user selected option 1, corrected the right navigator to unlabeled ticks, requested the role comparison expansion, and explicitly authorized PR creation and GitHub Pages deployment. Implementation screenshots were shown before integration. No new hosted workflow or deployment provider was added.

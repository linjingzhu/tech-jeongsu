# Floating table of contents

## Delivered

Converted the desktop TOC column into a floating, content-sized card. Labels remain on one line; the card grows with translated heading lengths. A viewport cap preserves the reading area and allows horizontal scrolling inside the card when a title cannot fit on a small screen. The main content reserves the measured card width, avoiding overlap. Tablet and phone use the existing TOC button to open the same card.

The right reading ticks are centered vertically in the viewport. Hover and focus no longer fill the rail background; individual tick and keyboard focus feedback remain.

## Verification

- Does the card size follow real labels? Browser measured 312.7px in Korean and 363.2px in English on the practical Git workflows page at 1280px viewport.
- Do labels wrap or the card overlap the article? Single-line label height and nowrap computed style verified; article starts to the right of the card with a clear gap; no horizontal page overflow.
- Are ticks centered, including hover? Center measured 360px at 720px viewport and 422px at 844px viewport. Actual hover background is transparent.
- Does mobile navigation work? 390×844 card stays within viewport, long English labels scroll horizontally; selection closes the panel, focuses section-4 and places its heading at approximately 96px.
- Visual evidence: sibling design-evidence/floating-toc-desktop.png, floating-toc-desktop-en.png, floating-toc-mobile-en.png. Desktop final capture 1440×1024. Console warning/error log empty.
- Existing content/translation/catalog/asset/Mermaid tests: 4/4 passed. JavaScript syntax and whitespace checks passed.
- Independent review: GPT-6 Sol PASS. Implementer: GPT-6 Astra. No new dependencies, data or deployment configuration.

## NOT VERIFIED

Safari/Firefox and screen-reader sessions were not repeated for this change. Full content re-audit was unnecessary: this change affects layout and controls only.

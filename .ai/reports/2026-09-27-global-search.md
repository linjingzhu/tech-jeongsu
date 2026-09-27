# Global document search

## Delivered

Moved search from the sidebar to the center of the header. On narrow screens it occupies a second header row, without requiring a menu drawer. Search covers the selected language's 28 Markdown documents (title, body, code, h2/h3 sections) and AI Map tool links, guide sections/resources and news. Results include context and a matching excerpt, with no arbitrary result limit. Section links preserve the renderer's anchor numbering. External links open in a separate tab.

Indexes load lazily with four concurrent requests, request timeouts, per-language memory caching, stale-response guards, partial-failure notice and retry. Search queries remain in the browser. No provider or new deployment workflow was added. Updated asset URL versions prevent stale layout/script combinations.

## Verification

- Are body-only matches linked correctly? “Cost per Accepted Change” returned two sections across different documents; selecting the second focused the correct heading at approximately 96px below the viewport top.
- Are all results available? Pure tests return all 151 fixture matches; browser Worktree search returned 37 links. Results scroll inside the panel.
- Are catalog links included? ChatGPT query returned web/download/resource links with safe external destinations. Equivalent URLs within a tool are deduplicated.
- Does mobile search work? At 390×844, the search field is centered in the second header row; results remain within the viewport. English retention search returned four matches. Selection focused the correct section below the 108px header, at approximately 132px.
- Is recovery honest? A temporary local test server returned one intentional 503 for the recovery document. The search showed five available Restore results with a partial-failure warning. Retry restored eight results and cleared the warning.
- Are keyboard and lifecycle behaviors correct? Arrow navigation, Enter, Escape with focus restoration, Ctrl/Cmd+K from the mobile drawer, empty/no-match state, language changes and rapid query replacement verified. No stale prior-query results remained.
- Automated content/catalog/asset/Mermaid and search tests: 7/7 passed. JavaScript syntax and git whitespace checks passed.
- Independent review: GPT-6 Sol PASS (implementer GPT-6 Astra). Local normal-session error/warning log checked separately from the intentionally failing test server.
- Evidence retained in sibling design-evidence: global-search-desktop.png, global-search-mobile.png; fault harness search-fault-server.py stays outside the repository.

## NOT VERIFIED

Safari/Firefox, physical mobile keyboards and screen-reader sessions were not separately tested. Search uses normalized substring matching, not fuzzy or semantic retrieval. Existing third-party resource facts were not re-researched.

# Owner Actions

One row per action only the repository owner can approve or perform. Reports
and other documents cite a row's id rather than restating its status — this
file is the single place that says what the status is.

Steps toward an AdSense application. The code side is done; each step below
needs the owner's account or domain. Moved here from `docs/SITE.md` on
2026-11-02 so that one file says what is still open. Statuses are as read from
`site.config.json` on that date.

## OA-1 — Connect a custom domain

- **Status**: open — `siteUrl` is still `https://linjingzhu.github.io/tech-jeongsu/`.
- Enter the domain under the repository's Settings → Pages and set its DNS at
  the registrar. AdSense reads `ads.txt` at the domain root, so a `github.io`
  sub-path is hard to apply with.

## OA-2 — Point the site at the new domain

- **Status**: open — after OA-1.
- Set `siteUrl` in `site.config.json` to the new address and rebuild. A
  non-`github.io` address generates `CNAME` and moves the addresses in
  `robots.txt` and `sitemap.xml`.

## OA-3 — Add a public contact address

- **Status**: open — `contactEmail` is empty; the contact page shows only the
  GitHub profile.
- Put an address that may be public in `contactEmail` and rebuild.

## OA-4 — Add the site to AdSense

- **Status**: open — `adsensePublisherId` is empty.
- Add the domain in AdSense, put the publisher id (`pub-…`) in
  `adsensePublisherId`, and rebuild. Every page's `<head>` gets the AdSense
  code and `ads.txt` is generated.

## OA-5 — Turn on the consent message

- **Status**: open — after OA-4.
- In AdSense → Privacy & messaging, enable a Google-certified CMP message for
  visitors from the EEA, the UK and Switzerland.

## OA-6 — Register with Search Console

- **Status**: open — after OA-1.
- Register the new domain and submit `sitemap.xml`; confirm the documents are
  indexed.

## OA-7 — Review the content in person

- **Status**: open.
- Read the AI-written documents and add experience and examples. Recheck the
  tax and legal figures in the Business section against official sources.

## OA-8 — Keep the site listed during review

- **Status**: open — applies once OA-4 is submitted.
- Do not remove the site from AdSense's site list until the review ends.
  While it runs, merges are limited to fixes (`.ai/REPOSITORY.md` § *Merge and
  deploy*, external review window).

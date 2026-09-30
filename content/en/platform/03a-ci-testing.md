# CI Fundamentals and Test Strategy: Merge Often, Learn Fast

CI (Continuous Integration) is not keeping a CI server switched on. It is **the habit of merging small changes often and having a machine answer "is this safe to merge?" within minutes of every merge**. This document covers what makes that answer trustworthy: where tests run, a flaky-test policy, speed, and required checks. Terms, the overall flow, artifact promotion and DORA metrics live in the hub document "CI/CD · OIDC · GitOps". Facts were checked as of 2026-09.

## CI Means "Merge Often"

In his Continuous Integration article, revised in 2024-01, Martin Fowler names **everyone pushes commits to the mainline every day** and **keep the build fast** as core practices. Running a CI tool while branches grow apart for weeks is CI in name only.

| Item | Trunk-based Development | Long-lived Feature Branches |
|---|---|---|
| Merge cadence | At least once a day | When the feature is done (days to weeks) |
| Conflicts | Small and frequent, resolved at once | Large and rare, piled up on merge day |
| What CI verifies | "Merged with main as it is now" | "Main as it was weeks ago" |
| Unfinished features | Merged behind a feature flag | Hidden on the branch |

Citing its 2016–2017 survey data, DORA reports that teams with three or fewer active branches that merge to trunk at least once a day performed better. Feature flags that hide unfinished work are covered in "Canary · Blue-Green · Flags · Rollback". **The fast-feedback principle**: if you move on to other work while waiting, you have lost the context by the time you learn of the failure. One of Fowler's CI check questions is "when the build fails, is it usually back to green within ten minutes?" PR checks should finish within minutes, and when main breaks, fixing it comes before new features.

## Pipeline Stages and Order: Fail Fast

```mermaid
flowchart LR
    C[Commit / PR] --> F[Format · Lint]
    F --> TY[Typecheck]
    TY --> U[Unit Test]
    U --> B[Build]
    B --> I[Integration Test]
    I --> G{Required checks pass?}
    G -->|Yes| M[Merge queue / Main]
    G -->|No| X[Notify the author at once]
    M --> E[E2E · Performance · Nightly]
```

- Put **cheap checks that fail often first**. Format and lint commonly take tens of seconds, unit tests a few minutes, E2E tens of minutes. Do not let a lint failure surface only after a 20-minute E2E run.
- Split independent checks (lint, unit) into **parallel jobs**. Forcing an order shows only the first failure; the rest appear on the next push.
- Within one stage, show **every failure at once**. If tests are split across runners, set `fail-fast: false` on the matrix so the other pieces run to the end when one fails.

## Test Levels: Pyramid and Trophy

| Level | What it verifies | Speed | Flakiness risk | Example |
|---|---|---|---|---|
| Static | Format and types, without running | Very fast | Almost none | ESLint, `tsc --noEmit` |
| Unit | One function or class | Fast | Low | Price calculation, a parser |
| Integration | Several units plus a real boundary such as a DB | Medium | Medium | Repository layer + a PostgreSQL container |
| Contract | The request and response promise between two services | Fast–medium | Low | Pact's consumer-driven contracts |
| E2E | A whole user flow | Slow | High | Sign-up → payment in a browser |

**The Test Pyramid** was introduced by Mike Cohn in his 2009 book *Succeeding with Agile* and spread through Martin Fowler's 2012 article. It puts the most tests in fast, stable unit tests and the fewest in slow, flaky UI tests. **The Testing Trophy** is the shape Kent C. Dodds proposed for JavaScript applications: static checks at the base and the largest share for integration tests ("Write tests. Not too many. Mostly integration."). The two differ in a judgment about **where bugs come from**. Either way, keep E2E to the few core flows you must protect. With several services, **contract tests** let each service's CI check "did the provider break the consumer's expectations?" without an E2E environment.

### What Runs When

| When | What runs | Blocks merge? | Principle |
|---|---|---|---|
| PR (every push) | Format, lint, typecheck, unit, affected integration tests | Yes | Under 10 minutes. Time an author can wait |
| Merge queue | The same required checks, on "latest main + PRs ahead" | Yes | Re-verify the combined result |
| After merge to main | Full integration, build, staging deploy ("Deployment Automation and Versioning") | No (alert) | If it breaks, revert first |
| Nightly | Full E2E, performance, dependency and link checks | No (open an issue) | Slow checks or ones that depend on outside systems |

## Flaky Tests: Retries Hide Bugs

Google calls **a test that both passes and fails on the same code** a flaky test. A 2016 Google Testing Blog post reported that about 1.5% of all test runs gave a flaky result and that about 16% of tests showed some level of flakiness. When red is often false, people shrug "that one again", and real failures get buried with it. Luo et al. (FSE 2014) analyzed 201 commits that fixed flaky tests in 51 open-source projects and named the first three causes in the table below as the most common (cited as about 45%, 20% and 12%).

| Cause | Symptom | Direction of the fix |
|---|---|---|
| Async wait | Check after `sleep(1000)`, fails only on slow runners | Wait for a condition, not a fixed time |
| Concurrency | Fails only when run in parallel | Remove shared state, separate resources per test |
| Test order dependency | Passes alone, fails in the full run | Each test creates and cleans its own data. Run in shuffled order |
| Time and dates | Fails at midnight, month end, in some time zones | Inject the clock (fake clock) |
| External network | Fails when an outside API is slow or down | Replace with contract tests or a fake server |

**Detection**: if a failed test passes when rerun **on the same commit**, record it as flaky. Playwright classifies tests that pass on retry as "flaky", and `--fail-on-flaky-tests` fails the run if any exist. The Node.js test runner shuffles execution order with `--test-randomize` from v26.1.0 and v24.16.0, which exposes order dependency. Only a per-test pass and fail history lets you find "the test that flaked three times this week".

**Policy**

1. A flaky test is **a real bug**. It may be a bug in the test or a race condition in the product. Open an issue with an owner and a deadline.
2. Quarantine (temporarily removing a test from required checks) is **a temporary measure with a deadline**. Keep running quarantined tests and record the results. Fowler also says quarantine is only a first step to limit damage, and the test must be fixed soon.
3. Use automatic retries **only as a detection tool**. Never silently count a pass-on-retry as a "pass". Lengthening a `sleep`, loosening an assertion or adding `skip` to get green is not a fix.

## Test Data and Throwaway Services

- **Each test creates its own data.** Leaning on a shared staging DB or fixed accounts makes results depend on run order and concurrency. Why not to copy production data is in the hub's "The Trap of Production-Like Data".
- **Start a real DB as a throwaway.** GitHub Actions service containers create a fresh container for each job and destroy it when the job ends (Linux runners only). To start containers from test code, use Testcontainers (Docker acquired its maintainer, AtomicJar, in 2023-12).

```yaml
jobs:
  integration:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:17
        env:
          POSTGRES_PASSWORD: postgres
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 5s
          --health-retries 10
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
      - run: npm ci
      - run: npm run test:integration
        env:
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/postgres
```

Steps start only after the health check passes, which removes the flaky cause "tests ran before the DB was up". The password here is a value for a container that disappears with the job, so it is not a secret.

## Static Checks and Coverage

| Check | What CI does | A gate? |
|---|---|---|
| Format | Reports differences in `--check` mode. CI does not fix and commit | Yes |
| Lint · Typecheck | Treats violations as failures. Warnings only pile up, so turn them off or raise them to errors. Run apart from the build job | Yes |
| Coverage | Shows reviewers the changed lines no test reached | A signal. Not a target |

Coverage counts the lines tests **executed**, not the lines they **verified**. Tests without assertions still raise the number, and making the number a target breeds such tests. Google Testing Blog's "Code Coverage Best Practices" (2020-08) describes an internal guideline of 60% as acceptable, 75% as commendable and 90% as exemplary, yet recommends team-level judgment over blanket mandates. Do not fail the build on a 0.1% drop; use coverage as grounds to ask in review "why does this branch have no test?"

## Speed: Keep PR Checks Under 10 Minutes

| Method | Effect | Caution |
|---|---|---|
| Cache | Shorter dependency install | Key on the lock file hash. Setup is in "GitHub Actions in Practice" |
| Test splitting (sharding) | Node.js `--test-shard=1/3` (since v20.5.0 and v18.19.0), Playwright `--shard=1/3` | The slowest piece sets the total time |
| Test impact analysis | Only related tests, with Jest `--changedSince=<branch>` or Playwright `--only-changed=<ref>` | Misses config and data changes. Run everything on main and nightly |

## Required Checks, Branch Protection, Rulesets, Merge Queue

A red light from CI is useless if the merge button still works. On GitHub these features make **merging possible only after checks pass** (as of 2026-09).

| Feature | What it does | Where it is available |
|---|---|---|
| Branch protection rules | Required status checks, reviews, no force pushes. Strict mode allows merge only when the branch includes the latest base | Public repositories on Free; private ones too on Pro, Team and Enterprise Cloud |
| Rulesets | When several rulesets overlap all apply, and the most restrictive rule wins. Anyone with read access can see the active rules | Same as branch protection |
| Merge queue | Re-verifies a PR on "latest base + PRs ahead" before merging | Public repositories owned by an organization; private repositories in Enterprise Cloud organizations |

**Where people get stuck**

- With a merge queue, the workflow needs the `merge_group` trigger. Without it, required checks are never reported and the merge fails.
- When path or branch filters **skip a whole workflow**, its check stays "Pending" and blocks the merge. When an `if` condition **skips a job**, it reports "Success".
- A job hanging off a failed job through `needs` is skipped and may not block the merge. So, as below (the `lint` and `test` definitions are omitted), add one gate job with `if: always()` and register only it as the required check. Adding or removing jobs then needs no change to the protection rules. Keep job names used as required checks unique across workflows. Results from a `workflow_dispatch` run do not satisfy required checks.

```yaml
on:
  pull_request:
  merge_group:
    types: [checks_requested]
jobs:
  ci-ok:
    if: always()
    needs: [lint, test]
    runs-on: ubuntu-latest
    steps:
      - if: contains(needs.*.result, 'failure') || contains(needs.*.result, 'cancelled')
        run: exit 1
```

## Example: The CI This Site Needs

This site (a static site that GitHub Pages serves from the `stable` branch, with no CI today) gates PRs on the two checks below; the workflow design that runs them is kept in one place, the "Example Design: If This Site Added CI" section of "GitHub Actions in Practice".

| Check | When | Blocks merge? | Why |
|---|---|---|---|
| `node --test tests/*.cjs` | PR, push to `stable` | Yes | Stops documents missing their English twin and broken diagrams |
| `node tools/build-site.mjs --check` | PR, push to `stable` | Yes | Stops changes that edit Markdown but forget to regenerate HTML |

## Metrics: Is CI Healthy?

| Metric | Definition | Why watch it |
|---|---|---|
| CI duration | From start to end of the PR's required checks (p50 · p90) | Past 10 minutes, people stop waiting and switch to other work |
| Flake rate | Share of runs whose result changed on a rerun of the same commit | As it rises, people stop trusting red |
| Time to green | From the moment main breaks until it passes again | How fast main is restored |

These metrics sit upstream of the DORA metrics ("CI/CD · OIDC · GitOps"). Slow, flaky CI lengthens change lead time, and as people start bypassing checks the change fail rate rises too.

## Bad Example / Good Example

```text
Bad:  Put retries: 3 on a flaky E2E test and record only "passed".
Good: Record tests that pass on retry as flaky and attach an issue and an owner.
      Fix or delete quarantined tests before their deadline.
```

## Self-Check Questions

1. How many days does your team's average feature branch live? What would it take (feature flags, small PRs) to bring that under a day?
2. If you moved the slowest stage of your PR checks to the merge queue or nightly, which bugs would you learn about later?
3. Counting a pass-on-retry as a "pass" hides what kind of product bug?
4. How does a required check look when path filters skip the workflow, and when `if` skips the job?
5. What mistake does this site's `build-site.mjs --check` prevent, and why put it in the PR gate?

## References

- [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html) (revised 2024-01-18) · [Continuous Integration Certification](https://martinfowler.com/bliki/ContinuousIntegrationCertification.html) · [Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html) (2012) · [Eradicating Non-Determinism in Tests](https://martinfowler.com/articles/nonDeterminism.html) (2011) — martinfowler.com, confirmed via search results 2026-09-30
- [Capabilities: Trunk-based development](https://dora.dev/capabilities/trunk-based-development/) — DORA, confirmed via search results 2026-09-30
- [The Testing Trophy and Testing Classifications](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications) — Kent C. Dodds, 2021-06-03 · [Pact Docs](https://docs.pact.io/) — Pact · [Docker acquires AtomicJar, maker of Testcontainers](https://www.docker.com/blog/docker-whale-comes-atomicjar-maker-of-testcontainers/) — Docker, 2023-12-11. All confirmed via search results 2026-09-30
- [Flaky Tests at Google and How We Mitigate Them](https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html) (2016-05, John Micco) · [Code Coverage Best Practices](https://testing.googleblog.com/2020/08/code-coverage-best-practices.html) (2020-08) — Google Testing Blog · [An Empirical Analysis of Flaky Tests](https://dl.acm.org/doi/10.1145/2635868.2635920) — Luo et al., FSE 2014. All confirmed via search results 2026-09-30
- [Retries](https://playwright.dev/docs/test-retries) · [Command line](https://playwright.dev/docs/test-cli) — Playwright Docs, checked 2026-09-30 (docs source on GitHub) · [Jest CLI Options](https://jestjs.io/docs/cli) — Jest, confirmed via search results 2026-09-30 · [Command-line API](https://nodejs.org/api/cli.html) — Node.js v26.10.0 Docs, checked 2026-09-30
- [Communicating with Docker service containers](https://docs.github.com/en/actions/tutorials/use-containerized-services/use-docker-service-containers) · [Events that trigger workflows: merge_group](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#merge_group) — GitHub Docs, checked 2026-09-30 (github/docs source)
- [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) · [About rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets) · [Managing a merge queue](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue) — GitHub Docs, checked 2026-09-30 (github/docs source)
- [Troubleshooting required status checks](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks) · [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) — GitHub Docs, checked 2026-09-30 (github/docs source)
- [actions/checkout](https://github.com/actions/checkout) v7.0.1 · [actions/setup-node](https://github.com/actions/setup-node) v7.0.0 — GitHub, tag commit SHAs checked 2026-09-30

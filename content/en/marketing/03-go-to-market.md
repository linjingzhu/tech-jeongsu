# Go-to-Market · Launch · PLG and SLG

Go-to-market (GTM) is not a "launch event". It is **the design of how a product meets customers, gets bought, and expands**.

## Components of a GTM Plan

| Component | Question |
|---|---|
| Target | Which segment / ICP do we pursue first |
| Value Proposition | What do we promise that segment |
| Pricing & Packaging | Free/paid boundary, pricing unit, plan structure |
| Motion | Product-led, sales-led, or a mix |
| Channels | Where are we discovered and where do people buy |
| Enablement | What do sales, support, and partners need to know |
| Metrics | How do we judge success |

## Comparing GTM Motions

| Aspect | Product-Led (PLG) | Sales-Led (SLG) |
|---|---|---|
| First value experience | Self-serve use after signup | Demo, PoC, sales conversation |
| Purchase decision | The user pays directly | Organizational procurement |
| Fits when | Value shows quickly, low price, self-onboarding possible | High price, complex adoption, many stakeholders |
| Key metrics | Activation, free-to-paid conversion, expansion | Pipeline, win rate, sales cycle |
| Risk | Free users grow but revenue does not | High sales cost leads to high CAC |

Atlassian and OpenView describe PLG as **a go-to-market strategy in which the product itself is the primary driver of acquisition, activation, retention, and expansion**.

### Hybrid: Product-Led Sales

In practice, the two are often combined: product usage data identifies accounts likely to buy, and sales steps in.

```text
MQL (Marketing Qualified Lead)
= Judged by response to marketing activity (e.g., downloading a resource)

PQL (Product Qualified Lead)
= Judged by behavior in the product (e.g., inviting 5 teammates, repeated use of a core feature)
```

Do not set PQL criteria by guesswork; derive them from **the behavior patterns of accounts that actually converted to paid**.

```mermaid
flowchart LR
    S[Signup] --> A[Activation]
    A --> H[Habit]
    H --> Q{PQL?}
    Q -->|Yes| R[Sales Assist]
    Q -->|No| N[Nurture]
    R --> P[Paid]
    N --> H
    P --> X[Expansion]
```

## B2B Buyers Research Alone, and Use AI Too

According to a Gartner survey published on 2026-05-20 (645 B2B buyers, August–September 2025; it is the same survey, but press releases give the sample as 645 or 646), buyers used an average of seven information sources in a recent purchase, and 45% said they used generative AI. In the same survey, 69% said they prefer to validate AI-generated insights with sales reps.

The share preferring a rep-free buying experience was 61% in the survey published on 2025-06-25 and 67% in the one published on 2026-03-09 (see document 01).

Implications:

- Websites, documentation, and pricing pages are read before any sales conversation
- If the website and sales say different things, trust is lost
- How AI answers summarize your product also becomes part of GTM (document 05)

## Pricing · Packaging

Pricing is not a single number; it is a decision about **what you charge for (the value metric)** and **where free ends (packaging)**.

| Value metric | Advantage | Disadvantage | Applied to the incident-monitoring tool |
|---|---|---|---|
| Seat (number of users) | Easy for buyers to understand and forecast | Makes people hesitate to invite teammates, slowing spread | Small amounts for teams of 1–5; a poor fit if team invites are the core behavior |
| Usage (log volume, events, alerts) | Price moves with value; customers can start small | Bills are hard to predict | Logs spike during incidents, so bills spike too and cause anxiety; a cap is needed |
| Tier (bundles of features and limits) | Simple, with a clear upgrade path | A badly placed boundary leaks value or causes frustration | Split tiers by log retention, number of connected services, and team size |

Place the free-plan boundary **after activation and before PQL**.

```text
Signup → Activation (first value experience)   ← free, and generously so, up to here
       → PQL signals (team invites, repeated use, nearing limits)  ← paid boundary here
       → Paid
```

- Block before activation and people leave before experiencing value.
- Give everything free past the PQL signals and there is no reason to pay.

Bad example:

> The free plan blocks log integrations and only sends alerts. Signups leave without ever seeing the root-cause screen.

Good example:

> The free plan allows one connected service and 7-day retention, enough to experience the first root-cause investigation. The paid boundary sits where teams need more than 3 members, 30-day retention, or several connected services. (The numbers are assumptions, to be adjusted using the behavior of accounts that actually converted.)

Treat a price change as a **Tier 1 launch** (table below). It needs existing-customer notices, sales and support scripts, and pricing pages that match the docs. If it raises a subscription price or converts free to paid, also check the E-Commerce Act's prior consent and notice requirements. For subscriptions billed through the App Store or Google Play in Korea, the platform collects this consent itself and auto-cancels without it, so build that into conversion forecasts (document 09).

## Tiering Launches

If every launch is the same size, the team burns out and customers become numb.

| Tier | Example criteria | Example activities |
|---|---|---|
| Tier 1 | New product, new market, pricing change | Press release, campaign, sales training, event |
| Tier 2 | Major feature, major integration | Blog, email, in-app announcement, sales briefing |
| Tier 3 | Improvements, small features | Changelog, in-app tooltip |

### Launch Checklist

- Who the launch is for and what changes (one sentence)
- Positioning and messaging document
- Impact on pricing, permissions, and plans
- Documentation, FAQ, support scripts
- Sales and support briefing
- Measurement plan (baseline, target, observation period)
- Criteria for rollback or rescheduling

A default schedule for Tier 1 and Tier 2 launches:

```text
T-4 weeks  Finalize positioning and message, finalize measurement plan (baseline, target)
T-2 weeks  Brief sales and support; prepare docs, FAQ, and support scripts
T-0        Launch, send through each channel
T+14 days  Review results → expand / adjust / roll back
```

## Bad Example / Good Example

Bad example:

> The feature is done, so we will announce it on every channel next Tuesday.

Good example:

> We promise the small-team admin segment "invitations done in 3 minutes". As a Tier 2 launch we use an in-app announcement and email; the goal is to improve the 7-day teammate invitation rate of new workspaces. After two weeks we review results and decide whether to expand.

## Common Mistakes

- Starting GTM right before launch
- Misreading PLG as "it sells itself without sales"
- Setting the free-plan boundary once and never revisiting it
- Reporting launch activity volume (emails sent, posts published) as results

## References

- [What is product-led growth? — Atlassian](https://www.atlassian.com/agile/product-management/product-led-growth) (accessed 2026-09-28)
- [Product-Led Growth — OpenView](https://openviewpartners.com/product-led-growth/) (accessed 2026-09-28)
- [Your Guide to Product Qualified Leads (PQLs) — OpenView](https://openviewpartners.com/blog/your-guide-to-product-qualified-leads-pqls/) (accessed 2026-09-28)
- [Gartner Survey Finds 69% of B2B Buyers Turn to Sales Reps to Validate AI-Generated Insights — Gartner](https://www.gartner.com/en/newsroom/press-releases/2026-05-20-gartner-survey-finds-sixty-nine-percent-of-b-two-b-buyers-turn-to-sales-reps-to-validate-ai-generated-insights) (2026-05-20, accessed 2026-09-28)
- [Gartner Sales Survey Finds 61% of B2B Buyers Prefer a Rep-Free Buying Experience — Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-sales-survey-finds-61-percent-of-b2b-buyers-prefer-a-rep-free-buying-experience) (2025-06-25, accessed 2026-09-28)

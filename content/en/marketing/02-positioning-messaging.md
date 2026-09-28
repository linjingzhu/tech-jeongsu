# Positioning · Messaging · Brand

Positioning is not a slogan. It is **a decision about which market you intend to win, against whom, and why you deserve to win it**.

## Components of Positioning

A widely used practical positioning method (April Dunford's public guide) settles the following components in order.

| Order | Component | Question |
|---|---|---|
| 1 | Competitive Alternatives | If we did not exist, what would customers use? (Including spreadsheets, manual work, or doing nothing) |
| 2 | Unique Attributes | What do we have that the alternatives lack? |
| 3 | Value | What outcome does that difference give the customer? |
| 4 | Target Customers | Which customers care most about that value? |
| 5 | Market Category | What frame (category) do customers use to understand us? |

```mermaid
flowchart LR
    A[Competitive Alternatives] --> B[Unique Attributes]
    B --> C[Value]
    C --> D[Target Customers]
    D --> E[Market Category]
    E --> F[Messaging]
```

The key point is that **you start from alternatives, not from features**. Customers do not buy features; they buy the difference versus their alternatives.

## Example: Positioning the Incident-Monitoring Tool

Filling in the five components for this track's example product gives the following. The numbers are **illustrative** and must be validated with their measurement conditions before real use.

| Component | Example |
|---|---|
| Competitive Alternatives | Alerts in Slack + manual searching in a log console + checking recent deploys separately in Git history |
| Unique Attributes | Automatically links the deploy history and related logs around the alert time and shows them on one screen |
| Value | Less time to find the cause (illustrative goal: see candidate causes within 10 minutes of an alert) |
| Target Customers | Developers on teams of 1–5 who run their own service without a dedicated operations team |
| Market Category | Incident response tool; built for small teams, not a large observability platform |

In one sentence: **"An incident response tool for small-team developers: when an alert fires, it bundles the related deploys and logs automatically, so the cause you used to chase between Slack and a log console is on one screen."**

The order matters. The feature "automatic deploy and log linking" only becomes value when compared with the alternative (manual searching).

## Choosing a Category

| Choice | Advantage | Cost |
|---|---|---|
| Differentiate within an existing category | Borrow a frame customers already understand | Direct comparison with incumbents |
| A subsegment of an adjacent category | Easier to lead a specific segment | Limited market size |
| Create a new category | Nothing to compare against | Very high education cost |

For most early-stage products, creating a new category is an expensive choice.

## Messaging

Messaging is **positioning translated into the customer's language**.

Bad example:

> The AI-powered, next-generation, all-in-one collaboration platform

Good example:

> When an incident alert fires, we pull the related logs and recent deployments into one screen so you can find the cause within 10 minutes.

The bad example could be attached to any product. The good example shows **whose situation changes, and how**.

### Message Hierarchy

```text
Core promise (one sentence)
↓
About three value pillars
↓
Proof supporting each pillar (features, cases, numbers)
↓
Objections and answers
```

A pillar without proof is only a claim. When using numbers, keep track of their source and measurement conditions.

#### Example: A Filled Message Hierarchy

Filling the four levels for the positioning above gives the following. The numbers are illustrative.

```text
Core Promise
  When an incident alert fires, find candidate causes within 10 minutes.

Pillar 1  Deploys and logs are linked automatically
  Proof   Deploys and logs from 30 minutes around the alert on one screen (feature screen)
Pillar 2  Set it up once, done in 5 minutes
  Proof   Three steps to connect a Git repository and cloud logs (install guide, measured setup time)
Pillar 3  Pricing a small team can afford
  Proof   Public price list, a plan for teams of 1–5

Objection  "We already have Slack alerts and a log console."
Answer     You keep receiving alerts in Slack. Clicking the link in an
           alert opens a screen with the related deploys and logs. It
           connects your existing tools rather than replacing them.
```

Note that the answer to the objection **does not ask the customer to abandon their alternative**. A low switching cost is part of the proof too.

### Validating Messages

- Read the sentence to a customer in an interview and ask them to explain it back
- Landing page A/B tests
- Compare responses across ad creatives (but do not judge by click-through rate alone)
- Check whether objections decrease in sales calls

## Brand and Performance

Brand and performance are not opposites; they are **investments on different time horizons**.

| Aspect | Brand Building | Activation / Performance |
|---|---|---|
| Goal | Build memory and preference | Drive action now |
| Timing of effect | Slow and long-lasting | Fast and short-lived |
| Measurement | Awareness, preference, search-volume trends | Clicks, conversions, CPA |
| Audience | The many who are not yet in market | The few who already intend to buy |

The IPA's "The Long and the Short of It" (2013) analyzed effectiveness case data, reported that the balance between brand and activation budgets matters for effectiveness, and found that about 60:40 was optimal on average. This is **a tendency in data dominated by consumer brands**, not a formula for every business.

### Mental Availability

The Ehrenberg-Bass Institute explains growth through two concepts.

- **Mental Availability**: Does the brand come to mind easily in buying situations?
- **Physical Availability**: Is it easy to buy?

The cues that bring a brand to mind are called **Category Entry Points (CEPs)**. For example, "when errors rise right after a deployment" is a CEP for a monitoring tool. Linking messages to CEPs increases the chance of being remembered.

## Common Mistakes

- Using the same message for every segment
- Using a competitor feature table as your positioning
- Overusing unverifiable adjectives such as "best" or "innovative"
- Cutting brand investment because of performance numbers alone
- Setting positioning once and leaving it unchanged as the market shifts

## References

- [A Quickstart Guide to Positioning — April Dunford](https://www.aprildunford.com/post/a-quickstart-guide-to-positioning) (accessed 2026-09-28)
- [The Key Works of Les Binet & Peter Field — IPA](https://ipa.co.uk/knowledge/effectiveness-research-analysis/les-binet-peter-field) (accessed 2026-09-28)
- [The next chapter for 'The Long and The Short of It' — IPA](https://ipa.co.uk/knowledge/ipa-blog/the-next-chapter-for-the-long-and-the-short-of-it) (accessed 2026-09-28)
- [Identifying and Prioritising Category Entry Points — Ehrenberg-Bass Institute](https://marketingscience.info/learn-with-us/commercial-research/identifying-and-prioritising-category-entry-points) (accessed 2026-09-28)
- [Easy to Find: Being Where B2B Buying Happens — Ehrenberg-Bass Institute](https://marketingscience.info/news-and-insights/easy-to-find-being-where-b2b-buying-happens) (accessed 2026-09-28)

# Marketing Metrics · Unit Economics

The purpose of marketing metrics is not reporting but **answering "Does it pay to buy more customers this way?"**

## Metric Tree

```mermaid
flowchart TD
    R[Revenue Growth] --> N[New Customers]
    R --> K[Retained Revenue]
    N --> V[Visitors or Leads]
    N --> C[Conversion Rate]
    K --> RT[Retention]
    K --> EX[Expansion]
    N --> CAC[CAC]
    K --> LTV[LTV]
    CAC --> U[Unit Economics]
    LTV --> U
```

## Core Definitions

| Metric | Definition | Caution |
|---|---|---|
| CAC | Customer acquisition cost = (marketing + sales cost) / new customers | State which costs are included |
| Paid CAC | Paid channel cost / customers acquired through paid channels | Distinguish from blended CAC |
| LTV | Present value of net profit (or gross profit) over the customer relationship | Overstated if calculated on revenue |
| LTV:CAC | LTV / CAC | Very sensitive to assumptions |
| CAC Payback | Months needed to recover CAC | State whether gross margin is applied |
| Retention | Share of customers (or revenue) remaining after a period | Distinguish logo-based from revenue-based |
| NRR | Retention and expansion of existing-customer revenue (including expansion) | Can be driven by one or two large customers |
| Conversion Rate | Rate of conversion between stages | Not comparable if the denominator changes |

### Blended CAC vs Paid CAC

a16z's "16 Startup Metrics" points out that if you only look at **blended CAC**, which includes customers who arrived organically, you cannot tell whether paid channels are actually profitable. To decide whether to increase budget, look at **paid CAC** separately.

### Calculating CAC Payback

```text
CAC Payback (months)
= CAC / (monthly revenue per customer × gross margin)

Example: CAC 6,000,000 KRW, monthly revenue 500,000 KRW, gross margin 80%
= 6,000,000 / (500,000 × 0.8) = 15 months
```

Calculating without gross margin makes the payback period look shorter than it really is.

## Example: Unit Economics of the Incident-Monitoring Tool (Assumptions)

Using the same numbers as the payback example above, calculate LTV, LTV:CAC, and blended versus paid CAC in one pass. Every number is an **assumption**.

```text
Assumptions
- ARPA (monthly revenue per account): KRW 500,000
- Gross margin: 80%
- Monthly logo churn: 3%, constant over time
- No expansion, no discounting to present value
- CAC (marketing + sales, blended): KRW 6,000,000

Monthly gross profit = 500,000 × 0.8 = KRW 400,000
Average lifetime     ≈ 1 / 0.03 ≈ 33.3 months
LTV                  ≈ 400,000 / 0.03 ≈ KRW 13.33M
LTV:CAC              ≈ 13.33M / 6.0M ≈ 2.2
CAC Payback          = 6.0M / 400,000 = 15 months
```

Splitting blended and paid CAC changes the picture.

```text
New paying accounts this quarter: 10; total marketing + sales cost KRW 60M
- 4 via paid channels, paid-channel cost (ad spend + related sales cost) KRW 40M
- 6 via organic search and referrals, content and community cost KRW 20M

Blended CAC = 60M / 10 = KRW 6.0M  → LTV:CAC ≈ 2.2, payback 15 months
Paid CAC    = 40M / 4  = KRW 10.0M → LTV:CAC ≈ 1.3, payback 25 months
```

Looking only at the blended number, adding paid spend seems fine; isolate the paid channels and payback takes more than two years. **Decide whether to raise the budget using paid CAC (ideally the incremental CAC from document 06).** If churn falls over time or there is expansion, LTV grows, so recalculate whenever an assumption changes.

## Benchmarks Are Only a Reference

Frequently cited rules of thumb:

- **LTV:CAC of 3:1**: a16z explains that investors use about 3x as a rough benchmark of a consumer company's financial health. The same piece shows a calculation in which improving LTV:CAC from 2x to 3x can nearly triple a company's valuation, because each unit of CAC leaves more profit to reinvest. The example's 2.2 falls short of this benchmark.
- **CAC Payback**: Published payback benchmarks vary widely by survey provider, year, customer size (SMB or enterprise), and whether gross margin is applied. Do not adopt a range as a target if you cannot check its source and definition.

These numbers vary with **industry, pricing model, growth stage, and cost of capital**. Your own cohort data is the more important benchmark.

## Look at Cohorts

Averages are good at lying. Split by signup month and acquisition channel.

```text
            M0    M1    M2    M3
Jan cohort  100%  62%   51%   47%
Feb cohort  100%  58%   45%   40%
Mar cohort  100%  66%   57%   -
```

- The key is whether the curve **flattens** (whether retention finds a floor)
- Splitting by channel reveals channels that "come in cheap but leave fast"
- The table above is a **hypothetical example** showing how to read it

## Reading Funnel Metrics

| Stage | Example metrics | Common misconception |
|---|---|---|
| Awareness | Impressions, reach, brand search volume | More impressions means better results |
| Acquisition | Visits, signups, leads | More leads is always good |
| Activation | Rate of reaching the first value experience | Signup = active user |
| Revenue | Paid conversion, ARPU | A conversion bought with discounts counts the same |
| Retention | Retention rate, churn rate | The overall average is enough |
| Referral | Referrals and invites | A referral made for a reward counts the same |

## Bad Example / Good Example

Bad example:

> Leads grew 40% this quarter.

Good example:

> Paid-channel leads grew 40% this quarter, but the paid conversion rate fell, so paid CAC rose 12%. Three-month retention of the new cohort is unchanged, so we keep our LTV assumption. Next quarter we will cut budget for the two campaigns with the lowest conversion rates and run landing page experiments.

A good report flows from **number → interpretation → decision**.

## Metric Pitfalls

- Targeting measurable vanity metrics (followers, impressions)
- Changing the denominator to make conversion rates look better
- Calculating LTV on revenue and over an unlimited period
- Treating attribution-based per-channel CAC as fact (document 06)
- Turning a metric into a target and inviting gaming

## References

- [16 Startup Metrics — Andreessen Horowitz](https://a16z.com/16-startup-metrics/) (2015, accessed 2026-09-28)
- [Why Do Investors Care So Much About LTV:CAC? — Andreessen Horowitz](https://a16z.com/why-do-investors-care-so-much-about-ltvcac/) (2023-08, accessed 2026-09-28)
- [What is the CAC payback period? — Stripe](https://stripe.com/resources/more/what-is-the-cac-payback-period) (accessed 2026-09-28)
- [It's Payback Time: A Crash Course in Our Favorite SaaS Metric — HubSpot](https://product.hubspot.com/blog/its-payback-time-a-crash-course-in-saas-metrics) (accessed 2026-09-28)

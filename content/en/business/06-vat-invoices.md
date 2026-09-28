# VAT · Zero Rate · Tax Invoices

> This is general information, not legal or tax advice. Rules change often, so verify with the official source or a licensed tax accountant (semusa) or lawyer before acting.

Value-added tax (VAT, bugagachise) is paid as **the tax collected on sales minus the tax paid on purchases**. For software businesses, overseas revenue (zero rating) and how app-store revenue is recorded matter most.

## Tax Periods and Filing Times

- VAT is filed and paid per six-month tax period, and each period is split into three-month parts with a preliminary period.
- The final return is due **within 25 days after the tax period ends** (VAT Act Article 49). On closure, within 25 days after the end of the month of closure.

| Business | Yearly flow (January to December periods) |
|---|---|
| Individual general taxpayer | January final return (previous 2nd period), April preliminary notice payment, July final return (1st period), October preliminary notice payment |
| Corporation | Four filings a year in January, April, July and October in principle. Small corporations with prior-period supply below KRW 150 million get April and October preliminary notices |
| Simplified taxpayer | January final return (once a year). July is the preliminary assessment period |

- Instead of a preliminary return, individual general taxpayers receive a notice in April and October for **50% of the tax paid in the previous period** (NTS guide).

```mermaid
flowchart LR
    J[January final return] --> A[April preliminary]
    A --> L[July final return]
    L --> O[October preliminary]
    O --> J
```

## Recording Revenue Correctly

- The common explanation is that app-store revenue is a **supply of services** and subject to VAT.
- According to press coverage of a Tax Tribunal case and tax professionals' commentary, revenue was held to be reported as **the gross payment before platform fees**, with fees booked as expenses. This can differ by transaction structure, so confirm with a tax accountant (needs verification).
- Keep **revenue by country** separately from app-store and payment-processor settlement reports. The domestic or overseas split decides the rate.

## Zero Rate: Overseas Revenue

Zero rating applies a 0% rate. Output VAT is zero, but input VAT can still be credited and refunded.

| Situation | Basis to review | Key point |
|---|---|---|
| Services supplied to a foreign corporation or non-resident with no domestic place of business | VAT Act Enforcement Decree Article 33 (foreign-currency earning services, etc.) | Requirements such as receiving payment through a foreign exchange bank |
| Overseas consumers buying an app on an app store | Tax professionals explain overseas-consumer sales as zero-rated and domestic-consumer sales as taxed at 10% | Official interpretation and transaction structure need verification |
| SaaS subscriptions collected through an overseas payment processor (Stripe, etc.) | Depends on who receives the service and how payment arrives | Confirm with a tax accountant |

- When filing at the zero rate, you may need to submit the **statement of foreign-currency earnings and zero-rate evidence** set by the NTS Commissioner.
- If zero-rated sales create a refund, you may be able to apply for an **early refund**.
- Simplified taxpayers are not set up to get input VAT refunded. If overseas revenue and purchases are large, consider general status (document 01).

Bad example:

> We reported all app-store deposits as a single line of "overseas revenue." Domestic consumer sales were mixed in.

Good example:

> Every month we downloaded settlement reports by country, split domestic and overseas amounts, and kept them with the zero-rate evidence.

## Tax Invoices and Electronic Tax Invoices

| Business | Issuing duty |
|---|---|
| Corporation | Must issue electronic tax invoices |
| Individual general taxpayer | Must issue electronically if prior-year supply per place of business (including exempt supply) is **KRW 80 million or more** (expanded from 2024-07-01) |
| Simplified taxpayer | Must issue tax invoices if prior-year gross supply is **KRW 48 million or more** (supplies from 2021-07-01). New or smaller businesses issue receipts |

- For individuals, the electronic duty starts **from the start of the 2nd tax period (July 1) of the year after** the threshold is reached.
- Rule: issue at each supply, dated at the time of supply.
- Exception: you can total one month of supplies per customer, date the invoice at month-end and **issue it by the 10th of the next month** (next business day if the 10th is a Saturday or holiday).
- Missing the issuing deadline or the NTS transmission deadline incurs penalty tax. Check the rates on the NTS "benefits and penalties" page.

```text
Sign a B2B contract
→ Confirm the supply time (service completion date / payment date, etc.)
→ Issue the electronic tax invoice on Hometax or your ERP
→ Confirm transmission to the NTS (check the NTS guide for the deadline)
→ Confirm it flows into the summary table at VAT filing
```

## References

- [NTS - VAT filing and payment deadlines](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2273&cntntsId=7694) (accessed 2026-09-28)
- [NTS - Corporate VAT filing and payment deadlines](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2402&cntntsId=238927) (accessed 2026-09-28)
- [Korea Law Information Center - VAT Act Article 49, final return and payment](https://www.law.go.kr/LSW//lsLawLinkInfo.do?lsJoLnkSeq=1000920200&lsId=001571&chrClsCd=010202&print=print) (accessed 2026-09-28)
- [Korea Law Information Center - VAT Act Enforcement Decree Article 33](https://www.law.go.kr/lsLawLinkInfo.do?lsJoLnkSeq=900327125&chrClsCd=010202) (accessed 2026-09-28)
- [NTS - Who must issue electronic tax invoices](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2461&cntntsId=7787) (accessed 2026-09-28)
- [NTS - Electronic tax invoice timing and issuing and transmission deadlines](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2463&cntntsId=7789) (accessed 2026-09-28)
- [NTS - Electronic tax invoice benefits and penalties](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2464&cntntsId=7790) (accessed 2026-09-28)
- [NTS Call Center - Main VAT filing questions](https://call.nts.go.kr/call/qna/selectQnaInfo.do?mi=1329&ctgId=CTG11943) (accessed 2026-09-28)
- [TaxWatch - App revenue must be reported including platform fees (press report, unofficial)](https://www.taxwatch.co.kr/article/tax/2022/05/16/0002) (reported 2022-05-16, accessed 2026-09-28)

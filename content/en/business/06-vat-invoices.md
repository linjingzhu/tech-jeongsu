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
| Simplified taxpayer | January final return (previous January to December). July: the tax office issues a preliminary assessment notice for January to June, payable by July 25. But **a simplified taxpayer who issued tax invoices in January to June must file a preliminary return by July 25** (VAT Act Article 66(3)) |

- Instead of a preliminary return, individual general taxpayers receive a notice in April and October for **50% of the tax paid in the previous period** (NTS guide).
- With a simplified taxpayer's July preliminary return, the summary tables of tax invoices issued and received are filed too (NTS Call Center Q&A). A business switching from simplified to general on July 1 also files and pays for January 1 to June 30 by July 25.

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
- **Foreign-currency conversion**: when payment is in a foreign currency, the tax base is **the converted amount** if you converted it to won before the time of supply, or the amount at **the base or arbitrated exchange rate on the time of supply** if you still hold or receive foreign currency after the time of supply (VAT Act Enforcement Decree Article 59). Confirm with a tax accountant what counts as the time of supply for app-store settlements (needs verification).

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

### Worked Example: One Tax Period for a Solo Developer (illustration only)

Assumes an individual general taxpayer in the 1st period of 2026 (January to June). The amounts are made up for illustration, and the treatment of app-store revenue depends on the "needs verification" point below.

| Transaction | Amount (supply value) | Treatment | Tax |
|---|---|---|---|
| Contract development for a Korean B2B client (electronic tax invoice issued) | KRW 20 million | Taxed at 10% | Output VAT KRW 2 million |
| App-store sales to overseas consumers | KRW 10 million | Assumed zero-rated (needs verification) | KRW 0 |
| App-store sales to domestic consumers (gross KRW 5.5 million, assumed VAT-inclusive) | KRW 5 million | Assumed taxed at 10% (needs verification) | Output VAT KRW 0.5 million |
| Development equipment bought from a Korean seller (tax invoice received) | KRW 3 million | Input VAT credit | Input VAT KRW 0.3 million |
| Overseas cloud invoice (assumed billed without VAT) | Paid in foreign currency | No input VAT to credit | KRW 0 |

```text
Output VAT = 2,000,000 + 0 + 500,000 = KRW 2,500,000
Input VAT = KRW 300,000
VAT payable = 2,500,000 - 300,000 = KRW 2,200,000 (before credits such as the e-filing credit)
```

- With a larger overseas share and more equipment purchases, input VAT can exceed output VAT and produce a **refund**.
- **App-store revenue needs verification**: whether overseas app stores (Google, Apple, etc.) collect and remit VAT from domestic consumers, and whether the developer supplies the consumer or the app-store operator, can change how the domestic share is taxed. No official interpretation was found, so confirm with a tax accountant before filing.
- **Proxy payment (daeri napbu) for services from foreign suppliers**: when you receive services from a foreign corporation or non-resident with no domestic place of business, the recipient collects and pays the VAT. This **does not apply when the service is used in a taxable business** (VAT Act Article 52; services whose input VAT is non-creditable are still included). Overseas cloud used by a taxable developer for the business is usually outside proxy payment, but check if exempt business or personal use is mixed in.
- Overseas invoice costs give no VAT credit but are still expenses for income tax (document 07).

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
- Missing the issuing deadline or the NTS transmission deadline incurs penalty tax. The main rates are in the table below.

### Penalty Tax Rates

| Penalty | Rate | Basis | Situation |
|---|---|---|---|
| Not registered | 1% of supply value from business start to the day before applying | VAT Act Article 60(1) | Contract revenue started in March but you applied for registration only in June |
| Tax invoice not issued | 2% of supply value | VAT Act Article 60(2) | Past the issuing deadline and still not issued by that period's final return deadline |
| Tax invoice issued late | 1% of supply value | VAT Act Article 60(2) | A March service was invoiced after April 10 but before July 25 |
| Electronic invoice transmitted late | 0.3% of supply value | VAT Act Article 60(2) | Missed the transmission deadline but transmitted by the final return deadline |
| Electronic invoice not transmitted | 0.5% of supply value | VAT Act Article 60(2) | Still not transmitted to the NTS by the final return deadline |
| Failure to file (general) | 20% of tax payable | Framework Act on National Taxes Article 47-2 | You forgot the July final return (40% for fraudulent acts) |
| Late payment | Unpaid tax × days late × 0.022% | Framework Act on National Taxes Article 47-4 | You filed but paid 30 days late (22/100,000 per day since 2022-02-15) |

- Confirm rates and how they interact (such as no double application) on the NTS "VAT penalty tax" page and in the statutes. For simplified taxpayers, tax-invoice penalties apply to supplies from 2021-07-01.

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
- [NTS - VAT penalty tax (individuals)](https://nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2276&cntntsId=7697) (accessed 2026-09-28)
- [Korea Law Information Center - VAT Act Article 60, penalty tax](https://www.law.go.kr/LSW//lsLawLinkInfo.do?lsJoLnkSeq=900317806&lsId=001571&chrClsCd=010202&print=print) (accessed 2026-09-28)
- [Korea Law Information Center - Framework Act on National Taxes Article 47-2, failure-to-file penalty](https://www.law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsId=001586&lsJoLnkSeq=1000819702&print=print) (accessed 2026-09-28)
- [NTS - Penalty tax and fines (late payment penalty)](https://www.nts.go.kr/gmt/cm/cntnts/cntntsView.do?mi=41010&cntntsId=239059) (accessed 2026-09-28)
- [Korea Law Information Center - VAT Act Enforcement Decree Article 59, foreign-currency conversion](https://www.law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=900331724&lsId=003666&print=print) (accessed 2026-09-28)
- [Korea Law Information Center - VAT Act Article 52, proxy payment](https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=269797&joNo=0052&joBrNo=00&docCls=jo&urlMode=lsScJoRltInfoR) (accessed 2026-09-28)
- [NTS Call Center - Simplified taxation Q&A (preliminary return)](https://call.nts.go.kr/call/qna/selectQnaInfo.do?mi=1329&ctgId=CTG11937) (accessed 2026-09-28)
- [NTS Call Center - Main VAT filing questions](https://call.nts.go.kr/call/qna/selectQnaInfo.do?mi=1329&ctgId=CTG11943) (accessed 2026-09-28)
- [TaxWatch - App revenue must be reported including platform fees (press report, unofficial)](https://www.taxwatch.co.kr/article/tax/2022/05/16/0002) (reported 2022-05-16, accessed 2026-09-28)

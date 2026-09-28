# Income Tax · Corporate Tax · Withholding · Books

> This is general information, not legal or tax advice. Rules change often, so verify with the official source or a licensed tax accountant (semusa) or lawyer before acting.

If VAT is "tax on transactions," income tax and corporate tax are **tax on the profit you kept over a year**. Books and evidence are how you prove that profit.

## Global Income Tax (Sole Proprietors)

- Income for one year (January 1 to December 31) is combined and filed and paid **in May of the next year**. The deadline is May 31.
- Businesses that submit a sincere-filing confirmation (seongsil singo hwagin) get one more month, until **June 30**.
- Rates are progressive from **6% to 45%** by tax base bracket (NTS global income tax rate table). Local income tax is added separately.
- **Interim prepayment**: part of the income tax for the first half (January 1 to June 30) is billed and paid in November. If the estimated interim amount is below KRW 500,000 nothing is payable, but you must file the estimate to cancel the notice.

## Corporate Tax

- File within **3 months** from the end of the month in which the fiscal year ends (Corporate Tax Act Article 60). For December year-end corporations, March 31 of the next year.
- Rates (fiscal years starting on or after 2026-01-01, NTS guide): tax base up to KRW 200 million 10%, over 200 million up to 20 billion 20%, over 20 billion up to 300 billion 22%, over 300 billion 25%.
- **Interim prepayment**: a corporation whose fiscal year exceeds 6 months pays interim tax for the first 6 months **within 2 months** after that period (Corporate Tax Act Article 63). The first fiscal year of a newly founded corporation is excluded.

## Withholding and Payment Statements

Withholding (woncheon jingsu) means deducting tax in advance when you pay someone and paying it on their behalf.

| Payee | Withholding | Payment statement |
|---|---|---|
| Staff salary (wage income) | Simplified tax table, year-end settlement | Payment statement by March 10 of the next year. Simplified statements are semiannual as of 2026 |
| Daily workers | Daily wage income withholding | By the last day of the month after payment |
| Freelancers (business income) | 3.3% of the payment (including local income tax) | Monthly simplified statements waive the annual statement (from 2023-01-01) |

- Pay withheld tax **by the 10th of the month after the month of withholding**.
- If you meet conditions such as regular headcount and are approved, **semiannual payment** (10th of the month after the half-year) is possible.
- Missing the payment statement deadline incurs penalty tax of 1% of the unsubmitted amount (0.25% for daily wage income and simplified statements). Submitting within 1 month after the deadline reduces it (NTS guide).

```mermaid
flowchart LR
    P[Pay a freelancer] --> W[Withhold 3.3%]
    W --> T[Pay withholding tax by the 10th of next month]
    W --> S[Submit simplified payment statement]
    T --> R[Annual settlement and books]
    S --> R
```

## Books: Simple Bookkeeping vs Double-Entry

The bookkeeping duty is set by **revenue by industry in the previous tax period**. New businesses are in principle simple-bookkeeping businesses.

| Industry group (excerpt of NTS criteria) | Simple bookkeeping | Double-entry required |
|---|---|---|
| Information and communication, manufacturing, accommodation and food, etc. | Below KRW 150 million | KRW 150 million or more |
| Professional, scientific and technical services, business support services, education services, etc. | Below KRW 75 million | KRW 75 million or more |

- Software development and supply usually falls under information and communication, but the registered industry code decides, so check on Hometax.
- Simple-bookkeeping businesses may still keep double-entry books.
- Small businesses with previous-period revenue below KRW 48 million, among others, are exempt from the no-bookkeeping penalty.
- Without books you file on an estimated (expense-ratio) basis, and real expenses are hard to recognize even when they are large.

## Expenses

- To have a cost recognized, the rule is to obtain **qualified evidence** (tax invoice, invoice, credit card slip, cash receipt).
- If you pay a business and do not receive qualified evidence, a **2%** penalty on the unreceived amount can apply (check the NTS guide for the threshold amount and exceptions).

| Cost | Evidence | Caution |
|---|---|---|
| Cloud and SaaS (overseas) | Invoice, card slip | Overseas vendors issue no Korean tax invoice. Pay by card and keep the invoice |
| App-store fees | Settlement report | Keep it paired with the gross revenue |
| Contract development | Tax invoice or withholding record | Distinguish a business from an individual freelancer |
| Equipment | Tax invoice, card slip | Fixed asset or not, depreciation |
| Meals and entertainment | Card slip | Record the business purpose |

Bad example:

> We mixed personal and business cards and hunted for a year of receipts in May.

Good example:

> We used only the business card, gathered overseas invoices into a folder at each month-end, and noted the purpose.

## Monthly Routine

```text
Start of month: download last month's settlement reports (domestic / overseas split)
10th: pay withholding tax (if any)
End of month: submit simplified payment statements (business income)
End of month: file overseas invoices and card slips
End of quarter: check VAT preliminary notices and returns
```

## References

- [NTS - Global income tax filing and payment deadlines](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2225&cntntsId=7665) (accessed 2026-09-28)
- [NTS - Sincere filing confirmation system](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2234&cntntsId=7672) (accessed 2026-09-28)
- [NTS - Global income tax rates](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2227&cntntsId=7667) (accessed 2026-09-28)
- [NTS - Global income tax interim prepayment](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7673&mi=2236) (accessed 2026-09-28)
- [NTS - Corporate tax filing and payment deadlines](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2371&cntntsId=7745) (accessed 2026-09-28)
- [NTS - Corporate tax rates (2026 onward)](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7746&mi=2372) (accessed 2026-09-28)
- [NTS - Corporate tax interim prepayment](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6565&cntntsId=7991) (accessed 2026-09-28)
- [NTS - Withholding tax filing and payment deadlines](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2290&cntntsId=7702) (accessed 2026-09-28)
- [NTS - Submitting payment statements](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=12242&cntntsId=8631) (accessed 2026-09-28)
- [NTS - Simplified payment statement (wage income) deadline cases](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=40678&cntntsId=239032) (accessed 2026-09-28)
- [NTS - Simple bookkeeping guide](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7670&mi=2231) (accessed 2026-09-28)
- [NTS - Bookkeeping duty and expense-ratio criteria](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2230&cntntsId=7669) (accessed 2026-09-28)

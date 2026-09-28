# Sole Prop · Corporation · VAT Type

> This is general information, not legal or tax advice. Rules change often, so verify with the official source or a licensed tax accountant (semusa) or lawyer before acting.

There are two decisions to make first when you start a business.

1. **Who is the business** — you as an individual (sole proprietor, gaein saeopja) or a separate corporation (beopin)
2. **How you pay VAT** — as a simplified taxpayer (gan-i gwase-ja) or a general taxpayer (ilban gwase-ja)

The second choice applies only to sole proprietors. A corporation cannot be a simplified taxpayer.

## Sole Proprietorship vs Corporation

| Item | Sole proprietor | Corporation (stock company) |
|---|---|---|
| Setup | Starts with business registration alone | Articles of incorporation, capital paid in, incorporation registry, then business registration |
| Income tax | Global income tax (6% to 45% per the NTS rate table) | Corporate tax (fiscal years starting on or after 2026-01-01: 10%, 20%, 22%, 25%) |
| Ownership of money | Money in the business account is the owner's money | The corporation's money. The CEO needs a basis such as salary or dividends to take it |
| Liability | Owner has unlimited liability for business debts | Shareholders are in principle limited to their contribution |
| Investment | No equity structure | Equity investment by issuing new shares |
| Admin cost | Low | Registry filings, double-entry books, shareholder and board records |

> Do not pick a corporation on tax rates alone. The moment you take the corporation's money for personal use, **tax on salary or dividends** applies again, and withdrawals without a basis cause problems.

### Tax Comparison Example (2026 tax year, illustration only)

A simple example that applies only the rate tables to the same **taxable income (gwase pyojun)**. In practice the two tax bases are not the same number (the CEO's salary is a corporate expense; an individual gets income deductions, etc.), and reliefs, tax credits and social insurance are all left out.

| Taxable income | Individual: global income tax | Individual: local income tax (10%) | Individual total | Corporation: corporate tax | Corporation: local income tax | Corporation total |
|---|---|---|---|---|---|---|
| KRW 100 million | KRW 19.56 million | KRW 1.956 million | about KRW 21.52 million | KRW 10 million | KRW 1 million | KRW 11 million |
| KRW 300 million | KRW 94.06 million | KRW 9.406 million | about KRW 103.47 million | KRW 40 million | KRW 4 million | KRW 44 million |

How it was computed:

- Individual global income tax = taxable income × rate − progressive deduction (NTS global income tax rate table). KRW 100 million falls in the over-88-million to 150-million bracket (35%, deduction KRW 15.44 million): 100 million × 35% − 15.44 million = KRW 19.56 million. KRW 300 million falls in the over-150-million to 300-million bracket (38%, deduction KRW 19.94 million): 300 million × 38% − 19.94 million = KRW 94.06 million.
- Individual local income tax is taken as 10% of the computed income tax (the local income tax table is one tenth of the national table).
- Corporate tax (fiscal years starting on or after 2026-01-01, NTS): 10% up to KRW 200 million, 20% on the excess. KRW 300 million = 200 million × 10% + 100 million × 20% = KRW 40 million.
- Corporate local income tax rose by 0.1 percentage point in every bracket for fiscal years starting on or after 2026-01-01, to 1%, 2%, 2.2% and 2.5% (2026 local tax amendment, local government notice). KRW 300 million = 200 million × 1% + 100 million × 2% = KRW 4 million.

How to read it:

- The corporate totals above are the tax **while the profit stays inside the corporation**. Once the CEO takes that money out, salary adds **wage income tax and social insurance (paid by both the corporation and the CEO)**, and dividends add **dividend income tax**.
- So a corporation mainly wins **when you can afford to reinvest or retain a large part of the profit**. If you must take almost everything out each year to live on, the gap shrinks a lot or can reverse.
- For a real decision, run the numbers with a tax accountant, including CEO salary, dividend plans and startup relief (document 08).

## Decision Flow

```mermaid
flowchart TD
    A[Preparing to start] --> B{Plan to raise outside equity}
    B -->|Yes| C[Consider incorporating]
    B -->|No| D{Profit high enough that progressive income tax hurts}
    D -->|Yes| C
    D -->|No| E{Do B2B customers require tax invoices}
    E -->|Yes| F[Sole prop, general taxpayer]
    E -->|No| G{Expected annual sales below the simplified threshold}
    G -->|Yes| H[Consider sole prop, simplified taxpayer]
    G -->|No| F
    F --> I[Consider converting to a corporation later]
    H --> I
```

## Simplified Taxpayer vs General Taxpayer

| Item | Simplified taxpayer | General taxpayer |
|---|---|---|
| Criterion | Individuals with prior-year gross supply below KRW 104 million (threshold applied from 2024-07-01) | All other individuals, every corporation |
| VAT payment exemption | No VAT payable if gross supply for the period is below KRW 48 million (tax periods starting 2021 onward) | None |
| Filings per year | One final return (January). But if you issued tax invoices in January to June, a preliminary return is due by July 25 (VAT Act Article 66(3)) | Twice (final returns, individuals) |
| Tax invoices | Must issue if prior-year gross supply is KRW 48 million or more; new or smaller businesses issue receipts | Issues invoices |
| Input VAT | 0.5% of invoiced purchase amounts credited (supplies from 2021-07-01) | Full input VAT credit, refunds possible |

Simplified status is not always better.

- If early equipment or contractor costs are large and you **want input VAT refunded**, general status can be better.
- If much of your revenue is **zero-rated** overseas revenue, refunds can arise, and simplified status can be a disadvantage there. See document 06.
- To give up simplified status you must file **by the last day of the month before the month you want general status to apply**, and you cannot return to simplified status for 3 years (VAT Act Article 70).
  - Exception (from 2024-07-01, Article 70(4) and (5)): a sole proprietor who was a new business or had prior-year gross supply below KRW 48 million when giving up simplified status may return to it within the 3 years if prior-year gross supply is **KRW 48 million or more but below KRW 104 million**, by reporting at least 10 days before the tax period in which it should apply (NTS simplified taxation Q&A).

### Switch Timing and Exclusions

| Situation | Detail (per the NTS simplified taxation Q&A and the statutes) |
|---|---|
| New business | If first-year gross supply is expected to stay below the threshold, **report simplified status together with the business registration application** (VAT Act Article 61) |
| Threshold exceeded | If gross supply for a calendar year reaches the threshold, you become a general taxpayer **from July 1 of the next year**. Check the tax office's notice of the change in taxpayer type |
| Just before a July 1 switch | A business switching from simplified to general files and pays for January 1 to June 30 as a tax period **by July 25** |
| Exclusion regardless of sales | Excluded industries under Enforcement Decree Article 109(2), such as manufacturing and wholesale, and the **Simplified Taxation Exclusion Criteria** notified by the NTS Commissioner (regions and industries, notice applied from 2024-07-01) bar simplified status even with small sales |
| Real estate rental, taxable entertainment venues | Not excluded industries, but a separate threshold of **KRW 48 million** applies |

- Whether software development and supply falls under the exclusion criteria can depend on the location and any other lines of business, so check on Hometax or with the tax office before registering.

## Incorporation Basics

A stock company (jusik hoesa) is created in this order.

```text
Decide trade name, purpose, head office
→ Draft articles of incorporation
→ Pay in capital (balance certificate)
→ File and pay registration license tax
→ Incorporation registry (Internet Registry Office or Online Incorporation System)
→ Corporate business registration
→ Social insurance workplace report (once staff or CEO pay starts)
```

Points to know:

- **The minimum capital rule was abolished** (Commercial Act amendment promulgated 2009-05-28, Act No. 9746. The Act as a whole took effect on 2010-05-29, but the Article 329 change took effect on promulgation under the proviso of the addenda). Par value per share must be KRW 100 or more (Commercial Act Article 329).
- **Notarizing the articles**: notarization is required in principle, but for a company with total capital under KRW 1 billion founded by promoters only (balgi seollip), the articles take effect when each promoter signs or seals them (Commercial Act Article 292).
- With capital under KRW 1 billion you can incorporate online through the **Online Incorporation System** of the Ministry of SMEs and Startups. It provides only standard articles, so write your own if you need special share terms.
- Where you place the head office can change the registration license tax burden and startup tax relief (document 08). Confirm amounts with the local government and a judicial scrivener.

Bad example:

> We incorporated with KRW 1 million of capital and from the first month the CEO paid personal expenses with the corporate card.

Good example:

> We set capital at six months of operating costs, fixed the CEO's pay through the articles and a shareholder resolution, and paid it as salary.

## Converting from Sole Proprietor to Corporation

Many start as sole proprietors and move to a corporation once profit is stable.

Signals to consider converting:

- Taxable income reaches the 35% bracket (over KRW 88 million) and you do not need to spend all of that profit right away (see the tax comparison example above)
- Revenue passes the **double-entry bookkeeping** threshold (KRW 150 million for information and communications and similar industries), so the bookkeeping load becomes close to a corporation's (document 07)
- Revenue approaches the **faithful filing confirmation** threshold (KRW 750 million for information and communications and similar industries) (document 07)
- You need outside investment or stock options

| Method | Overview |
|---|---|
| New corporation, then move the business | Create a new corporation and close the sole proprietorship. Contracts and accounts must be moved |
| Business transfer | Transfer the whole sole-prop business to the corporation |
| In-kind contribution | Contribute the sole-prop business assets to the corporation |

If business fixed assets are transferred by in-kind contribution or business transfer and the conditions are met, **capital gains tax can be carried over** (Restriction of Special Taxation Act Article 32). There are net-asset requirements and application deadlines, so design the conversion with a tax accountant first.

Check when converting:

- [ ] Procedures to move app-store, payment-processor and domain accounts to the new owner
- [ ] Customer consent to assign ongoing contracts
- [ ] Change of rights holder for trademarks, copyright and other IP
- [ ] Eligibility for startup tax relief (a conversion may not count as a "startup")

## References

- [NTS - VAT basics](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7693&mi=2272) (accessed 2026-09-28)
- [NTS Call Center - Simplified taxation FAQ](https://call.nts.go.kr/call/qna/selectQnaInfo.do?mi=1329&ctgId=CTG11937) (accessed 2026-09-28)
- [NTS - Corporate tax rates (2026 onward)](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7746&mi=2372) (accessed 2026-09-28)
- [NTS - Global income tax rates](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2227&cntntsId=7667) (accessed 2026-09-28)
- [Anyang City - Local tax changes in 2026 (corporate local income tax up 0.1 percentage point)](https://www.anyang.go.kr/main/contents.do?key=482) (effective 2026, accessed 2026-09-28)
- [NTS - VAT filing and payment deadlines (simplified taxpayer preliminary return)](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2273&cntntsId=7694) (accessed 2026-09-28)
- [Korea Law Information Center - VAT Act Enforcement Decree Article 109, scope of simplified taxation](https://www.law.go.kr/LSW/lsLawLinkInfo.do?lsJoLnkSeq=1015986155&chrClsCd=010202&ancYnChk=) (accessed 2026-09-28)
- [Korea Law Information Center - Simplified Taxation Exclusion Criteria (NTS notice)](https://law.go.kr/LSW/admRulLsInfoP.do?admRulSeq=2100000231706) (accessed 2026-09-28)
- [Korea Law Information Center - VAT Act Article 61, scope of simplified taxation](https://www.law.go.kr/LSW//lsLawLinkInfo.do?lsJoLnkSeq=1000920535&lsId=001571&chrClsCd=010202&print=print) (accessed 2026-09-28)
- [Korea Law Information Center - Commercial Act Article 292, effect of articles](https://www.law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=900729564) (accessed 2026-09-28)
- [Easy Law - Concept of a stock company](https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=736&ccfNo=1&cciNo=1&cnpClsNo=2) (accessed 2026-09-28)
- [Easy Law - Converting a sole proprietorship to a corporation](https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=632&ccfNo=3&cciNo=1&cnpClsNo=2) (accessed 2026-09-28)
- [Online Incorporation System - Notes on incorporation](https://www.startbiz.go.kr/contents/intr/startBizAtpn.do) (accessed 2026-09-28)

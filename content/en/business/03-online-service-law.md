# Terms · Privacy · E-Commerce

> This is general information, not legal or tax advice. Rules change often, so verify with the official source or a licensed tax accountant (semusa) or lawyer before acting.

An online service creates three legal relationships the moment it launches.

| Relationship | Main law | Output |
|---|---|---|
| Terms of use | Act on the Regulation of Terms and Conditions | Terms of service |
| Handling personal data | Personal Information Protection Act (PIPA) | Privacy policy, consent screens |
| Online sales and subscriptions | Act on Consumer Protection in Electronic Commerce (E-Commerce Act) | Operator identity display, withdrawal notices, checkout screens |

## Terms of Service

Standard terms are contract terms a business prepares in advance to contract with many customers.

- **Duty to state and explain**: write the terms in Korean using standardized wording so customers can understand them easily, and mark important parts clearly with symbols, characters or colors. Disclose the terms when contracting and give a copy on request (Terms Regulation Act Article 3).
- The "important parts" that must be explained are those that directly affect a customer's decision to contract or the price.
- Fair Trade Commission **standard terms** (for example the standard terms for internet shopping malls) are a good starting point. Standard terms are recommendations.

Bad example:

> We copied another service's terms and only changed the company name. The refund clause did not match our billing.

Good example:

> Starting from the standard terms, we reflected our real plans, cancellation and refund method, and data retention periods, and kept a change history.

## Privacy Policy

A personal information controller must set a privacy policy and publish it so data subjects can easily check it (PIPA Article 30).

The items the policy must contain are set by Article 30(1) of the Act and Article 31(1) of the Enforcement Decree. "If applicable" items are written only when you do that processing.

| Required item | When to include |
|---|---|
| Purpose of processing personal data | Always |
| Personal data items processed | Always |
| Processing and retention period | Always |
| Provision to third parties | If applicable |
| Outsourcing of processing | If applicable |
| Cross-border transfer (legal ground, items, country, recipient, etc.) | If applicable |
| Destruction procedure and method (with the legal ground and items if a law requires retention) | Always |
| Whether sensitive data may become public and how to choose non-disclosure (Act Article 30(1) item 4-2 (article number needs verification), related to Article 23(3), effective 2024-03-15) | If applicable |
| Rights and duties of data subjects and legal guardians, and how to exercise them | Always |
| Security safeguards | Always |
| Installation, operation and refusal of automatic collection tools (cookies, analytics and ad SDKs, etc.) | If applicable |
| Name of the chief privacy officer, or the responsible department and contact details | Always |
| Department that receives and handles access requests | Always (Enforcement Decree Article 31(1)) |
| Remedies for infringement of data subjects' rights | Always (Enforcement Decree Article 31(1)) |
| Changes to the privacy policy | Always (Enforcement Decree Article 31(1)) |

The Personal Information Protection Commission (PIPC) publishes **Privacy Policy Drafting Guidelines**. A revised edition was released in April 2025, so write from the latest edition.

## Commonly Missed Points in Data Handling

| Situation | Article to check | Key point |
|---|---|---|
| Data stored in overseas cloud or SaaS | Article 28-8, cross-border transfer | One of the legal grounds, such as separate consent, is required |
| Users under 14 | Article 22-2, protection of children's data | Legal guardian consent and verification of that consent |
| Appointing an officer | Article 31, chief privacy officer | Required in principle, with exceptions below certain thresholds |
| Analytics and ad SDKs | Article 30 policy, outsourcing vs provision | Inventory what each SDK collects |
| Personal data breach | Article 34, breach notification and reporting | Notify data subjects within 72 hours of learning of it. If 1,000 or more people, sensitive or unique identifying data, or unlawful outside access is involved, report to the PIPC or KISA within 72 hours |

```mermaid
flowchart TD
    A[Does the new feature use personal data] -->|No| Z[Just record it]
    A -->|Yes| B{Is each item necessary for the purpose}
    B -->|No| C[Do not collect]
    B -->|Yes| D{Does an outside vendor process it}
    D -->|Yes| E[Classify as outsourcing or provision and update the policy]
    D -->|No| F{Is it transferred abroad}
    E --> F
    F -->|Yes| G[Check cross-border transfer requirements]
    F -->|No| H[Define retention period and destruction]
    G --> H
```

## Extra Checks If You Ship an App

Mobile apps carry a few more legal duties than web services.

| Duty | Article | Who it applies to |
|---|---|---|
| Location-based service business report | Location Information Act Article 9, special rule for small businesses Article 9-2 | Businesses offering location-based services using personal location data report to the Korea Media and Communications Commission. Small business owners and one-person creative companies may start without reporting, but must report to continue past 1 month after starting |
| App access permission notice and consent | Network Act Article 22-2 | Apps that access device data or functions such as camera, location or contacts. **Separate required and optional permissions, explain them and get consent**, and do not refuse service because an optional permission was declined |
| Sending advertising information (push marketing) | Network Act Article 50 | Anyone sending commercial ads by app push, text or email. **Explicit prior consent**, separate consent for sending between 9 p.m. and 8 a.m. (email excepted, under the proviso to Article 50(3) and the Enforcement Decree), and periodic confirmation of consent |
| Game rating classification | Game Industry Promotion Act Articles 21 and 21-2 | Anyone distributing or offering a game. Get a rating from the Game Rating and Administration Committee or a self-rating business (such as an app market) |
| Harmful-to-minors media labeling | Youth Protection Act Article 13 | When offering content classified as harmful to minors. Harmful-to-minors label and age verification measures |
| Personal data breach notification and reporting | PIPA Article 34, Enforcement Decree Articles 39 and 40 | Every personal information controller. Notify data subjects within 72 hours, and report to the PIPC or KISA within 72 hours when the conditions apply (fine for not reporting) |

- App-store review rules (permission explanations, privacy labels, etc.) are separate from the law and must be met on their own.

## E-Commerce Act Duties

### Operator Identity Display

An online mall operator must display the trade name, representative's name, business address, phone number, email address, business registration number, terms of use and more on the initial screen (E-Commerce Act Article 10). A mail-order business shows its report number and other identity details in its advertising.

### Withdrawal of Orders

- A consumer can withdraw an order **within 7 days** of receiving the written contract terms, or, if delivery is later, within 7 days of receiving the goods or the start of the service (E-Commerce Act Article 17).
- Where withdrawal is limited, as with **digital content**, the business must state that clearly and take steps such as **providing a trial version** so the right is not obstructed.

### Subscription Billing and Dark Patterns

The amended E-Commerce Act promulgated on 2024-02-13 **took effect on 2025-02-14** and directly regulates six types of dark patterns. A subscription SaaS that a solo developer sells by card payment may also be covered, so confirm applicability with a legal review.

| Regulated practice | Article | Meaning for a subscription SaaS |
|---|---|---|
| Raising a recurring charge, or converting free to paid | Article 13(6) | Under the Enforcement Decree, obtain consumer consent within 30 days before the change and explain how to cancel |
| Showing only part of the price instead of the total | Article 21-2(1)1 | Show the real total on the pricing screen |
| Pre-selecting options | Article 21-2(1)2 | Do not pre-check paid options |
| False hierarchy | Article 21-2(1)3 | Do not grey out only the "cancel" button |
| Obstructing cancellation or account deletion | Article 21-2(1)4 | Cancellation as easy as sign-up |
| Nagging | Article 21-2(1)5 | No repeated pop-ups after a refusal |

Bad example:

> We silently moved users to an annual plan when the free trial ended.

Good example:

> Before the trial ended we asked for consent to the paid plan, and the consent screen showed the cancellation method and the charge.

## Pre-Launch Checklist

- [ ] Terms of service: review price, cancellation, refund, service change and limitation-of-liability clauses
- [ ] Privacy policy: matches the real data items, SDKs and storage locations
- [ ] Sign-up consent screen: required and optional items separated
- [ ] Site footer: operator identity and mail-order report number
- [ ] Checkout: total price shown, notice of withdrawal limits
- [ ] Subscriptions: free-to-paid consent flow and cancellation path
- [ ] Apps: required and optional permission notice, push ad consent, whether a location service report applies
- [ ] Breach response: owner and contact path for the 72-hour notification and report

## References

- [Korea Law Information Center - Act on the Regulation of Terms and Conditions](https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=203797) (accessed 2026-09-28)
- [Korea Law Information Center - PIPA Article 30](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?lsJoLnkSeq=1033215151) (accessed 2026-09-28)
- [Privacy Portal - Privacy Policy Drafting Guidelines (April 2025)](https://www.privacy.go.kr/front/bbs/bbsView.do?bbsNo=BBSMSTR_000000000049&bbscttNo=20806) (published April 2025, accessed 2026-09-28)
- [Privacy Portal - Duty to verify legal guardian consent](https://www.privacy.go.kr/front/contents/cntntsView.do?contsNo=94) (accessed 2026-09-28)
- [Korea Law Information Center - PIPA Enforcement Decree (Article 31, content of the privacy policy)](https://www.law.go.kr/LSW/lsInfoP.do?lsId=011468&ancYnChk=0) (accessed 2026-09-28)
- [Easy Law - Measures when personal data is leaked](https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1257&ccfNo=3&cciNo=2&cnpClsNo=3) (accessed 2026-09-28)
- [PIPC - Personal data breach reporting](https://www.pipc.go.kr/np/default/page.do?mCode=D030040000) (accessed 2026-09-28)
- [Government24 - Location-based service business report and change report](https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A09001&CappBizCD=15701000085) (accessed 2026-09-28)
- [Government24 - Location-based service business report for small businesses](https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A09001&CappBizCD=15701000086&tp_seq=) (accessed 2026-09-28)
- [Korea Law Information Center - Network Act Article 22-2, consent to access permissions](https://www.law.go.kr/LSW//lsLawLinkInfo.do?lsJoLnkSeq=900630227&lsId=000030&chrClsCd=010202) (accessed 2026-09-28)
- [Korea Law Information Center - Network Act Article 50, limits on commercial advertising](https://www.law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=1000688185&lsId=000030&print=print) (accessed 2026-09-28)
- [Korea Law Information Center - Game Industry Promotion Act](https://www.law.go.kr/LSW/lsInfoP.do?lsId=010196) (Article 21, rating classification, accessed 2026-09-28)
- [Easy Law - Harmful-to-minors labeling and packaging](https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=718&ccfNo=2&cciNo=2&cnpClsNo=3) (accessed 2026-09-28)
- [Korea Law Information Center - E-Commerce Act](https://www.law.go.kr/lsInfoP.do?lsId=009318&ancYnChk=0) (accessed 2026-09-28)
- [Korea Policy Briefing - Consent required within 30 days before a recurring price increase or paid conversion](https://www.korea.kr/news/policyNewsView.do?newsId=148939436) (accessed 2026-09-28)
- [Fair Trade Commission - Amendment of the E-Commerce consumer protection guideline](https://www.ftc.go.kr/www/selectBbsNttView.do?key=12&bordCd=3&nttSn=46527) (accessed 2026-09-28)
- [Fair Trade Commission - Standard terms](https://www.ftc.go.kr/www/selectBbsNttView.do?pageUnit=10&pageIndex=1&searchCnd=all&key=202&bordCd=201&nttSn=11139) (accessed 2026-09-28)

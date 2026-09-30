# 법 · 윤리 · 광고 표시

이 문서는 법률 자문이 아니다. **개발자·PO가 "이건 확인해야 한다"를 알아차리기 위한 지도**다. 실제 적용은 법무 검토와 최신 원문으로 확인한다.

## 세 가지 질문

```mermaid
flowchart TD
    Q[Marketing Activity] --> D{Personal Data?}
    Q --> A{Is it an Ad?}
    Q --> G{AI Generated?}
    D -->|Yes| C[Consent and Purpose]
    A -->|Yes| L[Ad Disclosure]
    G -->|Yes| T[AI Labeling]
    C --> R[Legal Review]
    L --> R
    T --> R
```

1. **개인정보를 쓰는가?** → 수집·이용 동의, 목적 제한, 맞춤형 광고 동의
2. **광고인가?** → 광고 표시, 경제적 이해관계 표시, 수신 동의, 광고 내용의 사실 여부와 실증
3. **AI 생성물인가?** → AI 생성·가상인물 표시

결제·해지·가격 화면을 만든다면 여기에 하나를 더한다. **화면 설계가 소비자의 선택을 왜곡하는가?** → 전자상거래법 다크패턴 규제.

## 한국: 광고성 정보 전송 (정보통신망법)

정보통신망법 제50조와 시행령은 전자적 전송매체(문자, 이메일, 앱 푸시 등)로 영리 목적 광고성 정보를 보낼 때의 규칙을 정한다.

| 요건 | 내용 |
|---|---|
| 사전 수신 동의 | 원칙적으로 수신자의 명시적 사전 동의 필요 |
| 야간 전송 | 오후 9시부터 다음 날 오전 8시까지는 별도의 사전 동의 필요 (전자우편 제외. 제50조 제3항 단서와 시행령) |
| 표시 의무 | 광고성 정보가 시작되는 부분에 "(광고)" 표시, 전송자 명칭·연락처, 수신 거부 방법 안내 |
| 거부·철회 | 수신 거부나 동의 철회 후에는 전송 금지 |
| 수신 동의 확인 | 동의를 받은 날부터 2년마다 수신 동의 여부를 확인 (시행령 제62조의3) |

나쁜 예:

> 회원가입 필수 약관에 마케팅 수신 동의를 묶고, 이벤트 푸시를 밤 10시에 보낸다.

좋은 예:

> 마케팅 수신 동의를 선택 항목으로 분리하고, 야간 발송은 별도 동의자에게만 보낸다. 모든 메시지 첫머리에 (광고)를 붙이고 수신 거부 경로를 넣는다.

## 한국: 개인정보와 맞춤형 광고 (개인정보 보호법)

- 개인정보 보호법 제22조는 재화·서비스 홍보나 판매 권유를 위해 개인정보 처리 동의를 받을 때 **정보주체가 명확하게 인지할 수 있도록 알리고** 동의를 받도록 한다. 선택 동의를 거부했다는 이유로 서비스 제공을 거부할 수 없다.
- 개인정보보호위원회는 2022-09 이용자 동의 없이 타사 행태정보를 수집·이용했다며 Google(692억 원)과 Meta(308억 원)에 과징금을 부과했고, 서울행정법원은 2025-01-23 이 처분이 정당하다고 판단했다.
- 개인정보보호위원회는 2024-01 「맞춤형 광고에 활용되는 온라인 행태정보 보호를 위한 정책 방안」을 발표하고 가이드라인 개정을 예고했다. 개정 가이드라인의 최종 확정 여부와 내용은 원문으로 다시 확인해야 한다.

## 한국: 표시·광고법 (부당한 표시·광고 금지)

「표시·광고의 공정화에 관한 법률」 제3조 제1항은 소비자를 속이거나 잘못 알게 할 우려가 있고 공정한 거래질서를 해칠 우려가 있는 네 가지 표시·광고를 금지한다.

| 유형 | 의미 | 예시 제품에서 걸리기 쉬운 문구 |
|---|---|---|
| 거짓·과장 | 사실과 다르게, 또는 사실을 지나치게 부풀려 표시·광고 | 아직 베타인 연동을 "완벽 지원"이라고 광고 |
| 기만 | 사실을 은폐하거나 축소 | "무료 Plan"을 광고하면서 7일 보존 제한을 숨김 |
| 부당 비교 | 비교 대상·기준을 밝히지 않거나 객관적 근거 없이 우리가 낫다고 비교 | 조건 없이 "경쟁사보다 3배 빠름" |
| 비방 | 객관적 근거 없이 다른 사업자나 상품을 깎아내리거나 불리한 사실만 광고 | "A사 도구는 장애 때 먹통이 됩니다" |

제5조는 **실증 의무**를 둔다. 사업자는 자기가 한 표시·광고 중 사실과 관련한 사항을 실증할 수 있어야 하고, 공정위가 실증자료를 요청하면 15일 이내에 제출해야 한다. 즉 "최초", "1위", "N배"를 쓰려면 광고를 내기 전에 근거 자료가 있어야 한다.

나쁜 예:

> 국내 최초, 업계 1위 장애 분석 도구

좋은 예:

> 2026-06 기준 자체 벤치마크: 로그 10만 건·배포 20회 조건에서 원인 후보를 찾는 시간이 수동 검색 대비 1.8배 빨랐습니다. (측정 방법 공개)

좋은 예의 수치는 설명을 위한 가정이다. 핵심은 **시점, 조건, 비교 대상, 측정 방법**을 함께 밝히고 그 자료를 보관하는 것이다. AI로 만든 광고 문구와 이미지도 같은 기준을 적용받는다.

## 한국: 전자상거래법 다크패턴 규제 (2025-02-14 시행)

개정 전자상거래법은 2025-02-14부터 숨은 갱신, 순차공개 가격책정, 특정옵션 사전선택, 잘못된 계층구조, 취소·탈퇴 방해, 반복 간섭의 6가지 온라인 다크패턴을 법으로 규제한다. 유형별 조문과 구독형 SaaS에서의 의미는 「약관 · 개인정보 · 전자상거래」에서 다룬다.

**유료 전환·가격 인상 규칙**: 정기결제 대금이 증액되거나 무료에서 유료로 전환되는 경우, 증액·전환 **전 30일 이내에** 소비자의 동의를 받고, 동의를 취소하기 위한 조건·방법 등을 알려야 한다 (시행령).

- **앱 마켓 결제 구독**: App Store나 Google Play로 결제하는 구독은 2025-02-14부터 한국 이용자에 대해 플랫폼이 무료 체험·할인 가격 종료 전 유료 결제 동의를 직접 받고, 이용자가 동의하지 않으면 구독을 자동 취소한다. Google Play는 앱에서 직접 동의를 받는 개발자에게 한시적으로 이 절차를 빼 주는 Opt-out을 허용했지만 2026-02-03부터 더 이상 받지 않는다. 앱 구독이라면 자체 동의 화면보다 플랫폼 절차를 전제로 전환율과 해지율을 예측한다.

나쁜 예:

> 14일 무료 체험이 끝나면 별도 안내 없이 카드로 자동 결제하고, 해지는 고객센터 이메일로만 받는다.

좋은 예:

> 유료 전환 전 30일 이내에 전환일·금액·해지 방법을 알리고 명시적 동의를 받는다. 동의하지 않으면 무료 Plan으로 남는다. 해지는 가입과 같은 설정 화면에서 같은 단계 수로 끝난다.

## 한국: 추천·보증과 AI 가상인물 (공정거래위원회)

- 「추천·보증 등에 관한 표시·광고 심사지침」은 인플루언서·후기 등에서 금전 지원, 할인, 협찬 같은 **경제적 이해관계를 소비자가 쉽게 알 수 있게 표시**하도록 한다. 표시는 제목이나 첫 부분처럼 쉽게 보이는 위치에 해야 하며, 본문 중간·댓글·"더보기" 뒤에 숨기는 방식은 적절하지 않다고 본다.
- 공정위는 2026-04 행정예고를 거쳐 개정 지침을 2026-06-01부터 시행했다. 생성형 AI 등으로 만든 **가상인물이 추천·보증하는 광고에는 "가상인물"임을 명확히 표시**해야 한다.
- 크리에이터가 협찬·제휴를 어디에 어떻게 표시하는지는 「표시 의무·저작권·세금」이 기준 문서다.

## 한국: 인공지능 기본법

- 「인공지능 발전과 신뢰 기반 조성 등에 관한 기본법」은 2026-01-22 시행되었다.
- 제31조의 투명성 확보 의무는 사전 고지, 생성형 AI 결과물 표시, 딥페이크 결과물의 명확한 고지·표시로 구성된다.
- **의무를 지는 주체는 인공지능사업자**(AI를 개발하거나 AI 제품·서비스를 제공하는 자)다. 과학기술정보통신부 「인공지능 투명성 확보 가이드라인」(2026-01)은 AI를 단순 도구로 써서 자기 업무나 콘텐츠를 만드는 자를 **이용자**로 보고, 이 의무의 대상이 아니라고 설명한다.
- 과학기술정보통신부는 과태료 계도기간을 최소 1년 이상 운영하겠다고 밝혔다. 구체적 기간과 방식은 원문으로 확인한다.

마케팅 실무에서는 다음처럼 나눠 본다.

| 상황 | 먼저 볼 규칙 |
|---|---|
| AI 도구로 광고 이미지·문구·가상 모델을 만든다 (이용자) | 공정위 추천·보증 심사지침의 가상인물 표시, 표시·광고법의 부당 광고 금지 |
| 우리 제품이 생성형 AI 기능을 제공한다 (예: 장애 원인 요약을 생성형 AI로 만들어 고객에게 보여 줌) | 인공지능사업자로서 AI 기본법 제31조의 사전 고지·결과물 표시 |

이용자라서 AI 기본법 의무가 없더라도, 광고에 쓰인 AI 생성물은 다른 법의 표시 의무를 그대로 받는다.

## EU

- **Consent**: EEA 사용자에 대해 Google 광고 측정·개인화 기능을 계속 쓰려면 동의를 받고 Consent Mode 신호를 전달해야 한다 (2024-03부터).
- **AI Act 제50조**: 2026-08-02부터 투명성 의무가 적용된다. 딥페이크를 배포하는 Deployer는 늦어도 처음 노출될 때 명확하게 알려야 한다. European Commission FAQ는 2026-08-02 이전에 출시된 시스템의 AI 생성물 Marking 의무에 한해 2026-12-02까지 제한적 유예를 언급한다 (EC FAQ 기준. 이후 Digital Omnibus 논의로 바뀔 수 있다).

## 미국

- FTC는 2023-06 Endorsement Guides를 개정해 소셜미디어·리뷰 환경의 추천·보증 규칙을 갱신했다.
- FTC의 소비자 리뷰·추천 규칙(Consumer Reviews and Testimonials Rule)은 2024-10-21 시행되었고, 존재하지 않는 사람의 후기(AI 생성 가짜 후기 포함)나 실제 경험이 없는 사람의 후기를 만들거나 판매하는 행위를 금지한다.

## 실무 체크리스트

- 마케팅 동의와 서비스 필수 동의가 분리되어 있는가
- 동의 기록(시점, 범위, 경로)이 남는가
- 광고 메시지 템플릿에 (광고), 발신자, 수신 거부가 기본 포함되는가
- 광고의 사실 주장(최초, 1위, N배)마다 시점·조건이 적힌 실증 자료가 있는가
- 결제·해지·가격 화면이 다크패턴 6개 유형에 걸리지 않는가
- 유료 전환·가격 인상 전 30일 이내 동의·고지 절차가 있는가
- 인플루언서·제휴 계약에 표시 의무가 명시되어 있는가
- AI 생성 인물·이미지·후기 사용 기준이 있는가
- 해외 사용자를 대상으로 하면 해당 국가 규칙을 확인했는가

## 윤리: 법보다 먼저 지킬 선

- 고객이 알면 불쾌할 방식으로 데이터를 쓰지 않는다
- 법이 정한 6개 다크패턴 유형에 딱 들어맞지 않더라도, 해지·수신 거부를 가입보다 어렵게 만들지 않는다
- 실증 의무가 미치지 않는 표현이라도 검증할 수 없는 인상을 주지 않는다
- 취약한 사용자(미성년자 등)를 겨냥한 압박을 하지 않는다

## 참고 자료

- [Network Act Article 50 — Korea National Law Information Center](https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EC%A0%95%EB%B3%B4%ED%86%B5%EC%8B%A0%EB%A7%9D%EC%9D%B4%EC%9A%A9%EC%B4%89%EC%A7%84%EB%B0%8F%EC%A0%95%EB%B3%B4%EB%B3%B4%ED%98%B8%EB%93%B1%EC%97%90%EA%B4%80%ED%95%9C%EB%B2%95%EB%A5%A0/%EC%A0%9C50%EC%A1%B0) (접속 2026-09-28)
- [Network Act Enforcement Decree Article 62-3 — Korea National Law Information Center](https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EC%A0%95%EB%B3%B4%ED%86%B5%EC%8B%A0%EB%A7%9D%EC%9D%B4%EC%9A%A9%EC%B4%89%EC%A7%84%EB%B0%8F%EC%A0%95%EB%B3%B4%EB%B3%B4%ED%98%B8%EB%93%B1%EC%97%90%EA%B4%80%ED%95%9C%EB%B2%95%EB%A5%A0%EC%8B%9C%ED%96%89%EB%A0%B9/%EC%A0%9C62%EC%A1%B0%EC%9D%983) (접속 2026-09-28)
- [표시·광고의 공정화에 관한 법률 — 국가법령정보센터](https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%ED%91%9C%EC%8B%9C%EA%B4%91%EA%B3%A0%EC%9D%98%EA%B3%B5%EC%A0%95%ED%99%94%EC%97%90%EA%B4%80%ED%95%9C%EB%B2%95%EB%A5%A0) (접속 2026-09-28)
- [표시광고법상 부당한 표시광고의 유형 — 소비자24](https://www.consumer.go.kr/user/bbs/consumer/380/940/bbsDataView/2813.do) (접속 2026-09-28)
- [다크패턴 관련 개정 전자상거래법령의 시행 및 규제 문답서 배포 — 김·장 법률사무소](https://www.kimchang.com/ko/insights/detail.kc?sch_section=4&idx=31411) (2025-02, 접속 2026-09-28)
- [6개 유형 온라인 다크패턴 규제 관련 문답서 배포(공정거래위원회) — 서울특별시](https://news.seoul.go.kr/economy/archives/566114) (2025-02, 접속 2026-09-28)
- [6개 유형 온라인 다크패턴 규제 관련 문답서 배포 — 대한민국 정책브리핑](https://www.korea.kr/briefing/pressReleaseView.do?newsId=156674112) (2025-02-13, 접속 2026-09-28)
- [정기결제 대금 인상 또는 유료 전환 전 30일 이내 소비자 동의 — 대한민국 정책브리핑](https://www.korea.kr/news/policyNewsView.do?newsId=148939436) (2025-02, 접속 2026-09-28)
- [Upcoming changes to offers and trials for subscriptions in South Korea — Apple Developer](https://developer.apple.com/news/?id=bo1b122z) (접속 2026-09-28)
- [Changes to Google Play's subscription functionality in South Korea — Play Console Help](https://support.google.com/googleplay/android-developer/answer/15722617?hl=en) (접속 2026-09-28)
- [South Korea Subscriptions Developer Opt-Out Period Ending — Play Console Help](https://support.google.com/googleplay/android-developer/answer/16514827?hl=en) (접속 2026-09-28)
- [Personal Information Protection Act Article 22 — Korea National Law Information Center](https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%EB%B3%B4%ED%98%B8%EB%B2%95/%EC%A0%9C22%EC%A1%B0) (접속 2026-09-28)
- [PIPC fines Google and Meta for unlawful collection of behavioral data — Korea.kr](https://m.korea.kr/news/policyNewsView.do?newsId=148905887) (2022-09, 접속 2026-09-28)
- [PIPC wins administrative lawsuit by Google and Meta — Korea.kr](https://www.korea.kr/briefing/pressReleaseView.do?newsId=156671852) (2025-01, 접속 2026-09-28)
- [PIPC briefing on online behavioral advertising policy — Korea.kr](https://www.korea.kr/briefing/policyBriefingView.do?newsId=156613321) (2024-01, 접속 2026-09-28)
- [KFTC amended guidelines on endorsements and testimonials take effect — KFTC](https://www.ftc.go.kr/www/selectBbsNttView.do?pageUnit=10&pageIndex=1&searchCnd=all&key=12&bordCd=3&searchCtgry=01%2C02&nttSn=47547) (2026, 접속 2026-09-28)
- [AI Basic Act takes effect with labeling duty for generative AI output — Korea.kr](https://www.korea.kr/news/policyNewsView.do?newsId=148958380) (2026-01, 접속 2026-09-28)
- [인공지능 기본법과 콘텐츠 산업 – '투명성 확보 의무'를 중심으로 — 법률신문](https://www.lawtimes.co.kr/news/articleView.html?idxno=217123) (2026, 접속 2026-09-28)
- [과기정통부, 「인공지능 투명성 확보 안내 지침(가이드라인)」 공개 — KDI 경제교육·정보센터](https://eiec.kdi.re.kr/policy/materialView.do?num=276195) (2026-01, 접속 2026-09-28)
- [Updates to consent mode for traffic in the EEA — Google Ads Help](https://support.google.com/google-ads/answer/13695607?hl=en) (접속 2026-09-28)
- [Transparency obligations under Article 50 of the AI Act — European Commission](https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act) (접속 2026-09-28)
- [FTC Announces Updated Advertising Guides to Combat Deceptive Reviews and Endorsements — FTC](https://www.ftc.gov/news-events/news/press-releases/2023/06/federal-trade-commission-announces-updated-advertising-guides-combat-deceptive-reviews-endorsements) (2023-06, 접속 2026-09-28)
- [FTC Announces Final Rule Banning Fake Reviews and Testimonials — FTC](https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials) (2024-08, 접속 2026-09-28)
- [The Consumer Reviews and Testimonials Rule: Questions and Answers — FTC](https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers) (접속 2026-09-28)

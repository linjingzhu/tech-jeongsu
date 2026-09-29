# Marketing 전체 개요

기준일: 2026-09-28

Marketing은 광고를 만드는 일이 아니다.

> **누구에게, 어떤 가치를, 어떤 경로로 전달해서, 어떤 비용으로 고객을 얻고 유지할지를 결정하고 검증하는 일**이다.

이 Track은 개발자·Product Owner가 Marketing 분야 전체를 구조적으로 이해하도록 만든 지도다. 용어 정의보다 **어떤 결정을 어떤 근거로 내리는지**에 집중한다.

## Marketing이 답해야 하는 핵심 질문

1. 누구의 어떤 문제를 겨냥하는가? (Segment, ICP)
2. 대안 대비 우리가 더 나은 이유는 무엇인가? (Positioning)
3. 그것을 어떤 말로 전달하는가? (Messaging)
4. 어떤 방식으로 시장에 들어가는가? (Go-to-Market)
5. 어떤 채널로 도달하고 관계를 유지하는가? (Channels, Lifecycle)
6. 실제로 효과가 있었는가? (Measurement, Incrementality)
7. 돈이 되는 구조인가? (CAC, LTV, Payback)
8. 법과 신뢰의 선을 지키는가? (Consent, 광고 표시)

```mermaid
flowchart LR
    R[Research] --> S[Segment]
    S --> P[Positioning]
    P --> M[Messaging]
    M --> G[Go-to-Market]
    G --> C[Channels]
    C --> X[Measurement]
    X --> U[Unit Economics]
    U --> L[Learn]
    L --> R
    C -.-> A[AI Search]
    X -.-> V[Privacy]
```

## 이 Track의 문서 구성

| 문서 | 다루는 질문 |
|---|---|
| 01 시장·고객 리서치 · Segmentation | 누구의 어떤 Job을 겨냥하는가 |
| 02 Positioning · Messaging · Brand | 왜 우리여야 하며, 어떻게 기억되게 하는가 |
| 03 Go-to-Market · Launch · PLG/SLG | 어떤 Motion으로 시장에 들어가는가 |
| 04 채널 전략 | Content/SEO, Paid, Lifecycle, Community, Partnership 중 무엇을 쓰고, 예산을 어떻게 나누고 늘리는가 |
| 05 AI 검색 · GEO/AEO | AI Overviews, ChatGPT search 시대에 발견되려면 |
| 06 측정 · Attribution · Privacy | 무엇이 실제로 효과를 냈는지 어떻게 아는가 |
| 07 Marketing Metrics | CAC, LTV, Payback, Retention을 어떻게 읽는가 |
| 08 AI 활용 Workflow · 리스크 | AI를 어디에 쓰고 어디서 멈추는가 |
| 09 법 · 윤리 · 광고 표시 | 동의, 광고 표시, 다크패턴, AI 생성물 표시의 기본 |

## B2B와 B2C는 무엇이 다른가

같은 개념도 B2B와 B2C에서 무게가 다르다. 아래는 일반적인 경향이며, 자세한 내용은 오른쪽 문서에서 다룬다.

| 구분 | B2B | B2C | 자세히 |
|---|---|---|---|
| 구매 단위 | 조직 (계정, 워크스페이스) | 개인·가구 | 01 (ICP와 Persona) |
| 의사결정자 수 | 여러 명: 사용자, 결정권자, 예산 승인자, 보안·법무 검토자 | 대개 본인 한 명 | 01 |
| 사이클 길이 | 길다. 단가와 도입 복잡도에 따라 늘어난다 | 짧다. 반복·충동 구매도 많다 | 03 (PLG와 SLG) |
| 주 채널 | 검색·문서, 커뮤니티, 파트너, 영업, 이메일 | 검색, Paid Social, 앱 푸시·메시지, 커머스·리뷰 | 04 |
| 핵심 지표 | Pipeline, PQL, Win Rate, NRR, CAC Payback | 전환율, Retention, 재구매, ARPU, LTV | 03, 07 |
| 법 적용 | 정보통신망법 제50조는 수신자를 개인으로 한정하지 않으므로 기업 담당자에게 보내는 광고 이메일에도 적용될 수 있다. 광고 문구는 표시·광고법 | 정보통신망법 제50조, 전자상거래법(다크패턴, 정기결제 전환), 개인정보 보호법(맞춤형 광고 동의), 표시·광고법 | 09 |

이 Track의 예시 제품은 **1–5인 팀이 쓰는 장애 모니터링 도구**다. 결제는 팀 단위(B2B)지만 개인 개발자가 카드로 직접 결제하기도 하므로, 두 열을 모두 확인해야 하는 경계 사례다.

## 2024–2026년에 바뀐 것 요약

시점이 중요한 변화만 모았다. 세부 근거는 각 문서의 참고 자료에 있다.

| 영역 | 변화 | 시점 |
|---|---|---|
| Browser | Chrome은 3rd-party Cookie 폐지 계획을 철회했고, Privacy Sandbox API 대부분을 은퇴시키기로 발표 | 2025-04, 2025-10 |
| 검색 | Google AI Overviews 200개+ 국가·지역, 40개+ 언어로 확대, AI Mode에 한국어 추가 | 2025-05, 2025-09 |
| 검색 측정 | Search Console 생성형 AI 성과 보고서가 영국 일부 사이트에 도입된 뒤 전체 사이트로 확대. 노출만 보이고 클릭·검색어는 없다 | 2026-06, 2026-08 |
| AI 답변 광고 | OpenAI가 미국에서 ChatGPT 광고 테스트 발표. 한국은 2026-06 파일럿 발표 후 OpenAI 공지 기준 2026-08-11 출시. 로그인한 성인 Free·Go 이용자 대상이며 유료 요금제는 광고 없음 | 2026-01, 2026-06, 2026-08 |
| Mobile | Apple ATT에 대해 프랑스·이탈리아 경쟁당국 과징금, 독일은 확약(Commitments) 수용 | 2025-03, 2025-12, 2026-08 |
| 측정 도구 | Google Meridian(오픈소스 MMM) 전체 공개 | 2025-01 |
| 규제 | 한국 전자상거래법 다크패턴 6개 유형 규제 시행, EU AI Act 제50조 투명성 의무 적용 시작, 한국 AI 기본법 시행 | 2025-02, 2026-08, 2026-01 |
| 광고 표시 | 공정위 추천·보증 심사지침에 AI 가상인물 표시 추가 | 2026-06 시행 |

## 공통 원칙

- **Channel보다 Customer가 먼저다.** 채널 선택은 Segment와 Positioning의 결과다.
- **Attribution 숫자는 증거가 아니라 가설이다.** 인과는 실험으로 확인한다.
- **Metric은 Unit Economics로 연결되어야 한다.** 클릭·노출은 중간 지표일 뿐이다.
- **도구와 정책은 빨리 바뀐다.** 날짜 없는 "요즘은 이렇다"는 믿지 않는다.
- **신뢰는 회복이 비싸다.** 동의, 광고 표시, 사실 확인은 비용이 아니라 전제다.

## Marketing 작업을 단순화하면

```text
고객 이해
→ 선택 (누구, 무엇)
→ 약속 (Positioning, Message)
→ 도달 (Channel)
→ 측정 (Incrementality)
→ 경제성 판단 (CAC, LTV)
→ 다시 선택
```

좋은 Marketing은 예산을 많이 쓰는 것이 아니라 **틀린 고객에게 틀린 약속을 할 확률을 줄이는 것**에 가깝다.

## 참고 자료

- [Update on Plans for Privacy Sandbox Technologies — Google Privacy Sandbox](https://privacysandbox.google.com/blog/update-on-plans-for-privacy-sandbox-technologies) (2025-10-17, 접속 2026-09-28)
- [AI Overviews are now available in over 200 countries and territories — Google](https://blog.google/products-and-platforms/products/search/ai-overview-expansion-may-2025-update/) (2025-05, 접속 2026-09-28)
- [Introducing Search Generative AI performance reports in Search Console — Google Search Central](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports) (2026-06, 접속 2026-09-28)
- [Generative AI performance report (Search) — Search Console Help](https://support.google.com/webmasters/answer/16984139?hl=en) (접속 2026-09-28)
- [Testing ads in ChatGPT — OpenAI](https://openai.com/index/testing-ads-in-chatgpt/) (2026-01-16 게시, 2026-08-11 갱신, 접속 2026-09-28)
- [OpenAI brings ChatGPT ads to Korea, keeps paid plans ad-free — The Korea Times](https://www.koreatimes.co.kr/business/companies/20260619/openai-brings-chatgpt-ads-to-korea-keeps-paid-plans-ad-free) (2026-06-19, 접속 2026-09-28)
- [다크패턴 관련 개정 전자상거래법령의 시행 및 규제 문답서 배포 — 김·장 법률사무소](https://www.kimchang.com/ko/insights/detail.kc?sch_section=4&idx=31411) (2025-02, 접속 2026-09-28)
- [정보통신망법 제50조 — 국가법령정보센터](https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EC%A0%95%EB%B3%B4%ED%86%B5%EC%8B%A0%EB%A7%9D%EC%9D%B4%EC%9A%A9%EC%B4%89%EC%A7%84%EB%B0%8F%EC%A0%95%EB%B3%B4%EB%B3%B4%ED%98%B8%EB%93%B1%EC%97%90%EA%B4%80%ED%95%9C%EB%B2%95%EB%A5%A0/%EC%A0%9C50%EC%A1%B0) (접속 2026-09-28)
- [Apple changes its rules for personalised advertising in apps — Bundeskartellamt](https://www.bundeskartellamt.de/SharedDocs/Meldung/EN/Pressemitteilungen/2026/08_17_2026_Apple_ATTF.html) (2026-08-17, 접속 2026-09-28)
- [Meridian is now available to everyone — Google](https://blog.google/products/ads-commerce/meridian-marketing-mix-model-open-to-everyone/) (2025-01-29, 접속 2026-09-28)
- [Transparency obligations under Article 50 of the AI Act — European Commission](https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act) (접속 2026-09-28)

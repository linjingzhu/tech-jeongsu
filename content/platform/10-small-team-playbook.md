# 작은 팀 실전 가이드: 1인 개발자와 소규모 팀

앞의 문서들은 큰 조직의 도구까지 다뤘다. 하지만 1–5명 팀에게 필요한 것은 **모든 것을 조금씩**이 아니라 **사고를 막는 몇 가지를 확실하게**다.

## 원칙

1. **관리할 것을 줄인다**: 가장 위 추상화(Static, PaaS, Serverless)부터 시작한다.
2. **되돌릴 수 있게 만든다**: 자동 배포보다 자동 Rollback 경로가 먼저다.
3. **알 수 있게 만든다**: 사용자보다 먼저 장애를 알아야 한다.
4. **잃으면 안 되는 것부터 지킨다**: Domain, 계정, Data, Secret.

## 단계별 구성

```mermaid
flowchart LR
    S0[0단계: 출시 전] --> S1[1단계: 첫 사용자]
    S1 --> S2[2단계: 유료 고객]
    S2 --> S3[3단계: 팀 확장]
```

| 단계 | 최소 구성 |
|---|---|
| 0. 출시 전 | Git + PR, Static / PaaS Hosting, Preview 배포, 도메인 자동 갱신, 모든 계정 2FA |
| 1. 첫 사용자 | CI에서 Test 후 자동 배포, Error Tracking, Uptime Check, DB 자동 Backup(PITR)과 RPO · RTO 합의, 복구 연습 1회(07 문서 "Backup과 복구 목표") |
| 2. 유료 고객 | 단순한 SLO 1–2개, 예산 경보, Status Page, Feature Flag, 장애 기록 템플릿, Infra를 IaC(Terraform · OpenTofu 등)로 옮기고 `plan`을 PR Check로(03 문서 "Infra도 코드로") |
| 3. 팀 확장 | 배포 절차 문서화, Template Repository, On-call 순번, 비용 Tag 정책, IaC Drift 검사, Cross-Region Backup 필요성 검토 |

## 추천 조합 예시

| 제품 형태 | 시작 조합 | 다음 단계 |
|---|---|---|
| 문서 · Landing Page | GitHub Pages 또는 Cloudflare Workers Static Assets | CDN Cache 규칙, Analytics |
| Web App + API | Vercel / Netlify(Frontend) + Serverless Container(API) + Managed DB | Staging 환경, Canary |
| 모바일 앱 + Backend | TestFlight · Closed Test + Serverless Backend | Phased Release, Server Feature Flag |
| 국내 공공 대상 SaaS | CSAP 인증을 받은 Cloud 확인부터(2027-07 국정원 검증 일원화 예정, 02 문서) | 인증 등급 요구사항 반영 |

플랜 조건은 바뀐다. 상업적 사용 허용 여부, 과금 단위, 제공사 로드맵은 01 문서의 Checklist로 확인한다.

## 최소 Pipeline

```yaml
name: ci
on: [push, pull_request]
permissions:
  contents: read
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@<commit-sha>
      - run: npm ci
      - run: npm test
      - run: npm run build
```

배포는 Hosting 제공사의 Git 연동을 쓰면 별도 Script 없이 시작할 수 있다. 중요한 것은 **Test가 실패하면 배포되지 않는 구조**다.

## 1인 개발자의 운영 습관

- **작게 자주 배포**: 한 번에 하나의 변경이면 무엇이 문제인지 바로 안다.
- **금요일 밤 배포 금지**: 혼자라면 주말 장애 대응도 혼자다.
- **Rollback 버튼 위치 확인**: 제공사 Dashboard에서 이전 배포로 돌아가는 방법을 미리 한 번 해 본다.
- **Backup은 복구해 봐야 Backup**: 분기에 한 번 실제 복구를 연습한다.
- **비용 경보**: 무료 플랜 상한과 유료 초과 과금 경보를 켠다. 트래픽 급증이 청구서 급증이 되지 않게 한다.
- **Secret 한 곳 관리**: Password Manager 또는 Secret Manager 하나에 모은다.

## 나쁜 예 / 좋은 예

```text
나쁜 예: "혼자니까 Staging도 Test도 필요 없다." → 사용자 신고로 장애를 처음 안다.
좋은 예: Preview 배포에서 직접 확인하고, CI Test 통과 시에만 Production에 나간다.
        Uptime Check가 사용자보다 먼저 알려 준다.
```

```text
나쁜 예: 개인 이메일 하나로 Domain, Cloud, Store 계정을 모두 만들고 2FA 없이 쓴다.
좋은 예: 업무용 계정과 2FA, 복구 코드 보관, 결제 수단 만료 알림까지 챙긴다.
```

## 출시 전 30분 Checklist

- [ ] Domain 자동 갱신과 결제 수단 유효
- [ ] HTTPS 인증서 자동 발급 · 갱신 확인
- [ ] 이전 버전으로 Rollback 해 봄
- [ ] Error Tracking과 Uptime 경보가 내 휴대폰으로 옴
- [ ] DB Backup 존재, RPO · RTO를 정했고 복구 절차 문서화 (07 문서)
- [ ] Secret이 Repository에 없음 (Secret Scanning 통과)
- [ ] 모바일이라면 최신 SDK · Target API 요구사항과 심사용 Demo 계정 준비
- [ ] 비용 경보 설정

## 이 트랙을 다시 읽는 순서

지금 가장 아픈 곳부터 읽는다. 배포가 무섭다면 04, 장애를 늦게 안다면 07, Data를 잃을까 무섭다면 07의 Backup과 복구 목표, Infra가 손으로 만들어져 있다면 03의 Infra도 코드로, 청구서가 무섭다면 09, 앱 심사가 막혔다면 05.

## 참고 자료

- [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) — GitHub Docs, 접근일 2026-09-28
- [Static Assets · Cloudflare Workers docs](https://developers.cloudflare.com/workers/static-assets/) — Cloudflare Docs, 접근일 2026-09-28
- [Vercel Hobby Plan](https://vercel.com/docs/plans/hobby) — Vercel Docs, 접근일 2026-09-28
- [Cloud Run billing settings for services](https://docs.cloud.google.com/run/docs/configuring/billing-settings) — Google Cloud Docs, 접근일 2026-09-28
- [Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use) — GitHub Docs, 접근일 2026-09-28
- [Service Level Objectives](https://sre.google/sre-book/service-level-objectives/) — Google SRE Book, 접근일 2026-09-28
- [Upcoming Requirements](https://developer.apple.com/news/upcoming-requirements/) — Apple Developer, 접근일 2026-09-28
- [Target API level requirements for Google Play apps](https://developer.android.com/google/play/requirements/target-sdk) — Android Developers, 접근일 2026-09-28

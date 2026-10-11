# CI 기초와 테스트 전략: 자주 합치고 빨리 알기

CI(Continuous Integration)는 CI 서버를 켜 두는 일이 아니라 **작은 변경을 자주 합치고, 합칠 때마다 몇 분 안에 "합쳐도 되는가"를 기계가 답하게 하는 습관**이다. 이 문서는 그 답을 믿을 만하게 만드는 테스트 배치, Flaky test 정책, 속도, 필수 검사를 다룬다. 용어, 전체 흐름, Artifact 승격, DORA 지표는 허브 문서 「CI/CD · OIDC · GitOps」에 있다. 사실은 2026-09 기준으로 확인했다.

## CI는 "자주 합치기"다

Martin Fowler는 2024-01에 고쳐 쓴 Continuous Integration 글에서 **모두가 매일 Mainline에 Commit을 Push하기**와 **Build를 빠르게 유지하기**를 핵심 실천으로 든다. CI 도구를 쓰면서 Branch를 몇 주씩 따로 키우면 이름만 CI다.

| 항목 | Trunk-based Development | 오래 사는 Feature Branch |
|---|---|---|
| Merge 주기 | 하루 한 번 이상 | 기능이 끝날 때(며칠에서 몇 주) |
| 충돌 | 작고 자주, 바로 풀림 | 크고 드물게, Merge 날 몰아서 |
| CI 결과의 의미 | "지금 Main과 합친 상태"를 검증 | "몇 주 전 Main 기준"을 검증 |
| 미완성 기능 | Feature Flag로 숨긴 채 Merge | Branch에 숨겨 둠 |

DORA는 2016–2017년 조사 Data를 근거로, 활성 Branch가 세 개 이하이고 하루 한 번 이상 Trunk에 합치는 팀의 성과가 더 높았다고 정리한다. 미완성 기능을 숨기는 Feature Flag는 「Canary · Blue-Green · Flag · Rollback」에서 다룬다. **빠른 피드백 원칙**: 결과를 기다리다 다른 일로 넘어가면, 실패를 알았을 때 이미 맥락을 잃었다. Fowler의 CI 점검 질문 중 하나는 "Build가 깨지면 보통 10분 안에 다시 Green이 되는가"다. PR Check는 몇 분 안에 끝나야 하고, Main이 깨지면 새 기능보다 복구가 먼저다.

## Pipeline 단계와 순서: 빨리 실패하기

```mermaid
flowchart LR
    C[Commit / PR] --> F[Format · Lint]
    F --> TY[Typecheck]
    TY --> U[Unit Test]
    U --> B[Build]
    B --> I[Integration Test]
    I --> G{필수 검사 통과?}
    G -->|예| M[Merge queue / Main]
    G -->|아니오| X[작성자에게 즉시 알림]
    M --> E[E2E · 성능 · Nightly]
```

- **싸고 자주 실패하는 검사를 앞에** 둔다. Format · Lint는 수십 초, Unit은 수 분, E2E는 수십 분이 흔하다. Lint 실패를 20분짜리 E2E 뒤에 알게 하지 않는다.
- 서로 독립인 검사(Lint, Unit)는 **병렬 Job**으로 나눈다. 순서를 강제하면 첫 실패만 보이고 나머지는 다음 Push에서야 보인다.
- 같은 단계 안에서는 **모든 실패를 한 번에** 보여 준다. Test를 여러 Runner로 나눴다면 Matrix에 `fail-fast: false`를 두어 한 조각이 실패해도 나머지를 끝까지 돌린다.

## 테스트 수준: Pyramid와 Trophy

| 수준 | 검증 대상 | 속도 | 흔들림 위험 | 예 |
|---|---|---|---|---|
| Static | 실행 없이 형식 · 타입 | 매우 빠름 | 거의 없음 | ESLint, `tsc --noEmit` |
| Unit | 함수 · Class 하나 | 빠름 | 낮음 | 가격 계산, Parser |
| Integration | 여러 단위 + 실제 DB 같은 경계 | 중간 | 중간 | Repository 계층 + PostgreSQL Container |
| Contract | 두 Service 사이의 요청 · 응답 약속 | 빠름–중간 | 낮음 | Pact의 Consumer-driven Contract |
| E2E | 사용자 흐름 전체 | 느림 | 높음 | Browser로 가입 → 결제 |

**Test Pyramid**는 Mike Cohn이 2009년 책 *Succeeding with Agile*에서 소개하고 Martin Fowler의 2012년 글로 퍼졌다. 빠르고 안정적인 Unit Test를 가장 많이, 느리고 흔들리는 UI Test를 가장 적게 둔다. **Testing Trophy**는 Kent C. Dodds가 JavaScript Application을 위해 제안한 모양으로, 바닥에 Static 검사를 두고 가장 큰 몫을 Integration에 준다("Write tests. Not too many. Mostly integration."). 둘의 차이는 **버그가 어디서 나는가**에 대한 판단이다. 어느 쪽이든 E2E는 꼭 지킬 핵심 흐름 몇 개로 줄인다. Service가 여럿이면 **Contract Test**로 "Provider가 Consumer의 기대를 깨지 않았는가"를 E2E 환경 없이 각자 CI에서 확인한다.

### 언제 무엇을 돌리나

| 시점 | 돌리는 것 | Merge를 막는가 | 원칙 |
|---|---|---|---|
| PR (Push마다) | Format, Lint, Typecheck, Unit, 영향받은 Integration | 예 | 10분 안쪽. 작성자가 기다릴 수 있는 시간 |
| Merge queue | PR과 같은 필수 검사를 "최신 Main + 앞선 PR" 위에서 | 예 | 합친 결과를 다시 검증 |
| Main Merge 후 | 전체 Integration, Build, Staging 배포(「배포 자동화와 버전 관리」) | 아니오(알림) | 깨지면 Revert가 먼저 |
| Nightly | 전체 E2E, 성능, 의존성 · Link 검사 | 아니오(Issue 생성) | 느리거나 외부에 의존하는 검사 |

## Flaky test: 재시도는 버그를 숨긴다

Google은 **같은 코드에서 통과와 실패가 모두 나오는 Test**를 Flaky test라 부른다. 2016년 Google Testing Blog 글은 전체 Test 실행의 약 1.5%가 Flaky 결과를 냈고 Test의 약 16%에 어느 정도 흔들림이 있었다고 적었다. 빨간불이 자주 거짓이면 사람들은 "또 그거겠지" 하고 넘기고, 진짜 실패도 함께 묻힌다. Luo 외(FSE 2014)는 오픈소스 51개 Project에서 Flaky test를 고친 Commit 201개를 분석해 아래 표의 앞 세 원인을 가장 흔한 원인으로 꼽았다(각 약 45%, 20%, 12%로 인용된다).

| 원인 | 증상 | 고치는 방향 |
|---|---|---|
| 비동기 대기 | `sleep(1000)` 뒤 확인, 느린 Runner에서만 실패 | 고정 대기 대신 조건을 기다린다 |
| 동시성 | 병렬 실행 시에만 실패 | 공유 상태 제거, Test별 Resource 분리 |
| 실행 순서 의존 | 단독 실행은 통과, 전체 실행은 실패 | Test마다 Data를 만들고 치운다. 순서를 섞어 돌린다 |
| 시간 · 날짜 | 자정, 월말, Time zone에서 실패 | 시계를 주입(Fake clock)한다 |
| 외부 Network | 외부 API 지연 · 장애 때 실패 | Contract Test나 가짜 Server로 대체 |

**탐지**: 실패한 Test를 **같은 Commit에서** 다시 돌려 통과하면 Flaky로 기록한다. Playwright는 재시도에서 통과한 Test를 "flaky"로 따로 분류하고, `--fail-on-flaky-tests`로 그런 Test가 있으면 실행을 실패시킨다. Node.js Test Runner는 v26.1.0 · v24.16.0부터 `--test-randomize`로 실행 순서를 섞어 순서 의존을 드러낸다. Test별 통과 · 실패 이력을 남겨야 "이번 주에 세 번 흔들린 Test"를 찾을 수 있다.

**정책**

1. Flaky test는 **실제 버그**다. Test의 버그일 수도, 제품의 Race condition일 수도 있다. Issue를 열고 담당자와 기한을 정한다.
2. Quarantine(필수 검사에서 잠시 제외)은 **기한 있는 임시 조치**다. 격리한 Test도 계속 돌려 결과를 기록한다. Fowler도 격리는 피해를 줄이는 첫 단계일 뿐 곧 고쳐야 한다고 말한다.
3. 자동 재시도는 **탐지 도구**로만 쓴다. 재시도로 통과한 결과를 조용히 "통과"로 세지 않는다. `sleep`을 늘리거나 Assertion을 느슨하게 하거나 `skip`을 붙여 Green을 만드는 것은 수정이 아니다.

## Test Data와 일회용 Service

- **Test마다 자기 Data를 만든다.** 공유 Staging DB나 고정 계정에 기대면 실행 순서와 동시 실행에 따라 결과가 바뀐다. Production Data를 복사하지 않는 이유는 허브 문서의 "Production 같은 Data의 함정"에 있다.
- **실제 DB를 일회용으로 띄운다.** GitHub Actions의 Service Container는 Job마다 새 Container를 만들고 Job이 끝나면 없앤다(Linux Runner 전용). Test 코드 안에서 Container를 띄우려면 Testcontainers(2023-12 Docker가 운영사 AtomicJar를 인수)를 쓴다.

```yaml
jobs:
  integration:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:17
        env:
          POSTGRES_PASSWORD: postgres
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 5s
          --health-retries 10
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
      - run: npm ci
      - run: npm run test:integration
        env:
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/postgres
```

Health check가 통과해야 Step이 시작되므로 "DB가 뜨기 전에 Test가 돌아 실패"하는 Flaky 원인이 사라진다. 여기 Password는 Job과 함께 사라지는 Container 전용 값이라 Secret이 아니다.

## 정적 검사와 Coverage

| 검사 | CI에서 하는 일 | 관문인가 |
|---|---|---|
| Format | `--check` 모드로 차이만 보고한다. CI가 고쳐서 Commit하지 않는다 | 예 |
| Lint · Typecheck | 위반을 실패로 처리한다. 경고는 쌓이기만 하므로 끄거나 오류로 올린다. Build와 별도 Job으로 돌린다 | 예 |
| Coverage | 변경된 줄 중 Test가 닿지 않은 곳을 Review에 보여 준다 | 신호. 목표치로 쓰지 않는다 |

Coverage는 Test가 **실행한** 줄을 셀 뿐 **검증한** 줄을 세지 않는다. Assertion 없는 Test로도 숫자는 오르고, 숫자를 목표로 삼으면 그런 Test가 늘어난다. 2020-08 Google Testing Blog의 "Code Coverage Best Practices"는 60%를 acceptable, 75%를 commendable, 90%를 exemplary로 보는 사내 기준을 소개하면서도 일괄 강제보다 팀별 판단을 권한다. 0.1% 하락으로 Build를 실패시키지 말고, "이 분기는 왜 Test가 없나"를 Review에서 묻는 근거로 쓴다.

## 속도: PR Check를 10분 안쪽으로

| 방법 | 효과 | 주의 |
|---|---|---|
| Cache | 의존성 설치 시간 단축 | Key는 Lock 파일 Hash로. 설정은 「GitHub Actions 실전」 |
| Test 분할(Sharding) | Node.js `--test-shard=1/3`(v20.5.0 · v18.19.0부터), Playwright `--shard=1/3` | 가장 느린 조각이 전체 시간을 정한다 |
| Test Impact Analysis | Jest `--changedSince=<branch>`, Playwright `--only-changed=<ref>`로 관련 Test만 | 설정 · Data 변경을 놓친다. Main과 Nightly에서는 전체를 돌린다 |

## 필수 검사, Branch 보호, Ruleset, Merge queue

CI가 빨간불을 켜도 Merge 버튼이 눌리면 소용없다. GitHub에서는 다음 기능으로 **통과해야만 합칠 수 있게** 만든다(2026-09 기준).

| 기능 | 하는 일 | 쓸 수 있는 곳 |
|---|---|---|
| Branch 보호 규칙 | 필수 Status check, Review, Force push 금지. Strict 모드는 Branch가 최신 Base를 포함해야 Merge 허용 | Free는 공개 Repository, Pro · Team · Enterprise Cloud는 비공개 포함 |
| Ruleset | 여러 Ruleset이 겹치면 모두 적용되고 가장 엄격한 규칙이 이긴다. 읽기 권한만 있어도 적용 중인 규칙을 볼 수 있다 | Branch 보호와 같음 |
| Merge queue | PR을 "최신 Base + 앞선 PR" 위에서 다시 검증한 뒤 합친다 | Organization 소유 공개 Repository, Enterprise Cloud Organization의 비공개 Repository |

**자주 막히는 곳**

- Merge queue를 켜면 Workflow에 `merge_group` Trigger가 있어야 한다. 없으면 필수 검사가 보고되지 않아 Merge가 실패한다.
- Path · Branch 필터로 **Workflow 전체가 건너뛰어지면** 그 Check는 "Pending"에 머물러 Merge를 막는다. `if` 조건으로 **Job이 건너뛰어지면** "Success"로 보고된다.
- 실패한 Job에 `needs`로 매달린 Job은 Skipped가 되어 Merge를 막지 못할 수 있다. 그래서 아래처럼(`lint` · `test` 정의는 생략) `if: always()`인 관문 Job 하나를 두고 그것만 필수 검사로 등록한다. Job을 추가 · 삭제해도 보호 규칙을 고칠 필요가 없다. 필수 검사로 쓰는 Job 이름은 Workflow끼리 겹치지 않게 한다. `workflow_dispatch`로 돌린 결과는 필수 검사를 채우지 못한다.

```yaml
on:
  pull_request:
  merge_group:
    types: [checks_requested]
jobs:
  ci-ok:
    if: always()
    needs: [lint, test]
    runs-on: ubuntu-latest
    steps:
      - if: contains(needs.*.result, 'failure') || contains(needs.*.result, 'cancelled')
        run: exit 1
```

## 예시: 이 사이트에 필요한 CI

이 사이트(`stable` Branch를 GitHub Pages로 내보내는 정적 사이트, 지금은 CI 없음)의 PR 관문은 아래 두 검사이고, 이 검사를 돌리는 Workflow 설계는 「GitHub Actions 실전」의 "예시 설계: 이 사이트에 CI를 붙인다면"에 한 곳으로 모아 두었다.

| 검사 | 시점 | Merge를 막는가 | 이유 |
|---|---|---|---|
| `node --test tests/*.cjs` | PR, `stable` Push | 예 | 영문 짝이 빠진 문서, 깨진 Diagram을 막는다 |
| `node tools/build-site.mjs --check` | PR, `stable` Push | 예 | Markdown만 고치고 HTML 재생성을 잊은 변경을 막는다 |

## 지표: CI가 건강한가

| 지표 | 정의 | 보는 이유 |
|---|---|---|
| CI Duration | PR 필수 검사의 시작부터 끝까지(p50 · p90) | 10분을 넘기면 사람들이 기다리지 않고 딴 일로 넘어간다 |
| Flake rate | 같은 Commit 재실행에서 결과가 바뀐 실행의 비율 | 오르면 빨간불을 믿지 않게 된다 |
| Time to Green | Main이 깨진 시점부터 다시 통과할 때까지 | Main을 얼마나 빨리 복구하는가 |

이 지표는 DORA 지표(「CI/CD · OIDC · GitOps」)의 앞단이다. CI가 느리고 흔들리면 Change Lead Time이 늘고, 검사를 우회하는 사람이 생기면서 Change Fail Rate도 오른다.

## 나쁜 예 / 좋은 예

```text
나쁜 예: 흔들리는 E2E Test에 retries: 3을 걸고 결과에 "통과"만 남긴다.
좋은 예: 재시도로 통과한 Test를 flaky로 기록하고 Issue와 담당자를 붙인다.
        격리한 Test는 기한 안에 고치거나 지운다.
```

## 자기 점검 질문

1. 팀의 Feature Branch는 평균 며칠 사는가? 하루 안쪽으로 줄이려면 무엇(Feature Flag, 작은 PR)이 필요한가?
2. 지금 PR Check에서 가장 느린 단계를 Merge queue나 Nightly로 옮기면 어떤 버그를 늦게 알게 되는가?
3. 재시도로 통과한 Test를 "통과"로 세면 어떤 종류의 제품 버그가 숨는가?
4. Path 필터로 Workflow가 건너뛰어질 때와 `if`로 Job이 건너뛰어질 때 필수 검사는 각각 어떻게 보이는가?
5. 이 사이트의 `build-site.mjs --check`는 어떤 실수를 막고, 왜 그것을 PR 관문에 두는가?

## 참고 자료

- [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html)(2024-01-18 개정) · [Continuous Integration Certification](https://martinfowler.com/bliki/ContinuousIntegrationCertification.html) · [Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html)(2012) · [Eradicating Non-Determinism in Tests](https://martinfowler.com/articles/nonDeterminism.html)(2011) — martinfowler.com, 2026-09-30 검색 결과로 확인
- [Capabilities: Trunk-based development](https://dora.dev/capabilities/trunk-based-development/) — DORA, 2026-09-30 검색 결과로 확인
- [The Testing Trophy and Testing Classifications](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications) — Kent C. Dodds, 2021-06-03 · [Pact Docs](https://docs.pact.io/) — Pact · [Docker acquires AtomicJar, maker of Testcontainers](https://www.docker.com/blog/docker-whale-comes-atomicjar-maker-of-testcontainers/) — Docker, 2023-12-11. 모두 2026-09-30 검색 결과로 확인
- [Flaky Tests at Google and How We Mitigate Them](https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html)(2016-05, John Micco) · [Code Coverage Best Practices](https://testing.googleblog.com/2020/08/code-coverage-best-practices.html)(2020-08) — Google Testing Blog · [An Empirical Analysis of Flaky Tests](https://dl.acm.org/doi/10.1145/2635868.2635920) — Luo 외, FSE 2014. 모두 2026-09-30 검색 결과로 확인
- [Retries](https://playwright.dev/docs/test-retries) · [Command line](https://playwright.dev/docs/test-cli) — Playwright Docs, 2026-09-30 확인(GitHub의 문서 원본) · [Jest CLI Options](https://jestjs.io/docs/cli) — Jest, 2026-09-30 검색 결과로 확인 · [Command-line API](https://nodejs.org/api/cli.html) — Node.js v26.10.0 Docs, 2026-09-30 확인
- [Communicating with Docker service containers](https://docs.github.com/en/actions/tutorials/use-containerized-services/use-docker-service-containers) · [Events that trigger workflows: merge_group](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#merge_group) — GitHub Docs, 2026-09-30 확인(github/docs 원본)
- [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) · [About rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets) · [Managing a merge queue](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue) — GitHub Docs, 2026-09-30 확인(github/docs 원본)
- [Troubleshooting required status checks](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks) · [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) — GitHub Docs, 2026-09-30 확인(github/docs 원본)
- [actions/checkout](https://github.com/actions/checkout) v7.0.1 · [actions/setup-node](https://github.com/actions/setup-node) v7.0.0 — GitHub, Tag의 Commit SHA를 2026-09-30 확인

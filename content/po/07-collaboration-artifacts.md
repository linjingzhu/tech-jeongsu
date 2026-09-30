# 협업 · 회의 · 산출물

PO의 중요한 기술 중 하나는 **정보를 줄이고 결정을 남기는 것**이다.

## 주요 협업 상대

| 상대 | PO가 주로 맞추는 것 |
|---|---|
| 사용자 | 문제, Context, Pain |
| Designer | Workflow, UX 품질 |
| Engineer | Scope, Constraint, Technical Risk |
| QA | Acceptance, Regression |
| Product Manager | Strategy, Goal |
| Project Manager | 일정, Dependency |
| Sales/CS | 고객 요구와 빈도 |
| Leadership | 투자 대비 Outcome |

## 좋은 회의의 목적

회의는 정보 공유보다 **결정과 정렬**을 위해 쓴다.

```text
회의 전
- 질문
- 필요한 결정
- 자료

회의 중
- 사실
- 의견
- 선택지
- Decision

회의 후
- Decision
- Owner
- Next Action
```

## PO가 자주 만드는 문서

### Product Brief

- Problem
- User
- Goal
- Why Now
- Success Metric
- Scope

### Feature Spec

- Background
- Workflow
- UI / Behavior
- Rules
- Edge Cases
- Acceptance Criteria

### Decision Log

```md
Decision:
Imported Camera Animation은 Camera Shot으로 취급한다.

Reason:
기존 Timeline mental model과 일치.

Rejected:
별도 Animation Object 생성.

Impact:
Import, Timeline, Save/Load 검토 필요.

Revisit if:
사용자가 Camera Shot과 Animation을 구분하지 못한다는 피드백이 반복되면 재검토.
```

### Release Scope

```text
Included
Excluded
Known Limitation
Risk
Verification
```

## 좋은 문서의 특징

- 구현 과정 설명보다 사용자 행동 중심
- 한 문서에 하나의 책임
- 결정과 이유를 분리
- 열린 질문 표시
- 최신 상태만 유지
- 그림이 더 빠르면 다이어그램 사용

## PO와 Engineer 커뮤니케이션

PO:

> “이렇게 구현하세요.”

보다:

> “사용자는 A 상태에서 B를 선택하면 C 결과를 기대합니다. 내부 구현은 제약을 보고 같이 결정합시다.”

가 좋다.

PO는 기술 결정을 침범하지 않으면서도 **제품 행동 계약(Product Behavior Contract)**은 명확하게 해야 한다.
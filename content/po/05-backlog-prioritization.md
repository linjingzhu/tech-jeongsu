# Backlog · 우선순위 · 요구사항

Backlog는 아이디어 저장소가 아니다.

> **현재 제품 목표를 달성하기 위해 가까운 미래에 고려할 일을 우선순위와 맥락까지 포함해 정리한 실행 후보 목록**이다.

## Backlog Item의 기본 구조

```text
Title
Problem / Background
User
Goal
Scope
Out of Scope
Workflow
Acceptance Criteria
Risk
Dependencies
Evidence
```

## 우선순위 판단

단 하나의 공식으로 자동 결정하지 않는다.

주로 다음 축을 함께 본다.

| 축 | 질문 |
|---|---|
| Value | 사용자/사업 가치가 큰가 |
| Reach | 몇 명에게 영향을 주는가 |
| Frequency | 얼마나 자주 쓰이는가 |
| Urgency | 지금 하지 않으면 손실이 있는가 |
| Risk | 기술·제품 위험이 큰가 |
| Effort | 구현 비용은 얼마인가 |
| Confidence | 근거가 얼마나 확실한가 |
| Strategic Fit | 제품 방향과 맞는가 |

## 간단한 Scoring 예

```text
Priority
≈ Value × Reach × Confidence
  ─────────────────────────
          Effort
```

점수는 정답이 아니라 토론을 구조화하는 도구다.

## Must / Should / Could

MoSCoW 같은 분류도 사용할 수 있다.

- Must: 없으면 목표 달성 불가
- Should: 중요하지만 대안 존재
- Could: 여유가 있으면
- Won't now: 지금은 하지 않음

가장 중요한 항목은 마지막이다.

> Backlog 관리에는 **하지 않기로 한 결정**도 포함된다.

## Acceptance Criteria

구현 방법보다 관찰 가능한 결과를 쓴다.

나쁜 예:

> QPushButton을 추가한다.

좋은 예:

> 사용자가 Preset을 선택하면 Camera FOV와 Transform이 함께 복원된다.

## Backlog Refinement

정기적으로 확인한다.

```text
Goal과 연결되는가?
↓
문제가 아직 유효한가?
↓
Scope가 너무 큰가?
↓
Dependency가 있는가?
↓
Acceptance가 명확한가?
↓
우선순위가 여전히 맞는가?
```

Backlog가 커지는 것은 성과가 아니다. **불필요한 Item을 삭제하고 선택을 선명하게 만드는 것**도 PO의 일이다.
# 협업: Commit, Push, PR, Code Review

Git 협업에서는 **코드를 공유하는 것**과 **리뷰 과정을 관리하는 것**을 구분해야 한다.

~~~text
Branch Push = 작업 상태 공유
Pull Request = 변경점 검토 · 토론 · 승인 · 통합
~~~

협업자가 확인하고 개선할 일이 많다면 보통 **Branch Push + Draft PR** 조합이 가장 적합하다.

---

## Branch Push · Draft PR · 일반 PR

| 방식 | 목적 | 적합한 상황 |
|---|---|---|
| Branch Push | 작업 상태 공유 | 상대가 checkout해서 실행·수정할 때 |
| Draft PR | 작업 중 협업 | 방향 검토, 중간 피드백, 수정할 것이 많이 남았을 때 |
| 일반 PR | 최종 리뷰 요청 | 구현과 기본 검증이 끝났을 때 |

~~~mermaid
flowchart LR
    A[Feature Branch] --> B[Push]
    B --> C{리뷰 준비 완료?}
    C -->|아직 작업 중| D[Draft PR]
    C -->|완료| E[Regular PR]
    D --> F[협업 · 수정 · 중간 피드백]
    F --> G[Ready for Review]
    G --> E
    E --> H[Review]
    H --> I[Merge]
~~~

### Draft PR

의미:

> 작업 중이지만 지금부터 함께 확인하자.

적합한 경우:

- 구현이 아직 덜 끝남
- 구조나 방향을 먼저 확인받고 싶음
- 협업자가 직접 수정할 부분이 많음
- Known Issue가 남아 있음
- Build/Test가 일부 미완료

### 일반 PR

의미:

> 구현은 준비됐으니 본격적으로 리뷰하고 Merge 여부를 판단해 달라.

---

# 내가 PR을 열었을 때 — Author Workflow

## 1. PR 열기 전

다음을 확인한다.

~~~text
Current Branch
Target Base Branch
Commit 목록
Diff
Build/Test 상태
Uncommitted Changes
~~~

예:

~~~text
Head: feature/camera
Base: stable
~~~

## 2. 작업 중이면 Draft PR로 시작

~~~text
개발 시작
→ Branch Push
→ Draft PR
→ 중간 Feedback
→ 수정
→ Ready for Review
→ 일반 PR
~~~

GitHub 웹에서는 PR 생성 버튼의 메뉴에서 **Create draft pull request**를 선택한다.

GitHub CLI에서는:

~~~bash
gh pr create --draft
~~~

작업이 끝나면 **Ready for review**로 전환한다.

## 3. PR 본문 작성

추천 구조:

~~~md
## Summary
무엇을 변경했는가

## Background
왜 필요한가

## Changes
주요 변경사항

## Screenshots
Before / After

## Review Needed
집중해서 확인할 부분

## Known Issues
남아 있는 문제

## Verification
Build / Test / QA 결과
~~~

특히 협업자가 개선해야 할 내용이 많다면 **Review Needed**를 명확히 쓴다.

예:

~~~md
## Review Needed

- Save/Load 구조 검토
- Error handling 개선
- Camera state ownership 확인
- UI interaction 세부 조정
~~~

## 4. PR 생성 후에도 수정 가능

PR을 연 뒤에도 다음은 계속 수정할 수 있다.

- 제목
- 본문
- Reviewer
- Label
- Milestone
- 설명과 체크리스트

GitHub PR 화면의 **Edit** 버튼으로 수정한다.

PR 본문은 한 번 작성하고 끝나는 문서가 아니라 **현재 작업 상태를 반영하는 협업 문서**로 사용하는 것이 좋다.

## 5. 이미지와 GIF 첨부

PR 본문과 Comment에 이미지 첨부가 가능하다.

대표 방법:

- Drag & Drop
- Clipboard Paste
- 파일 선택

UI/UX 작업에서는 다음 형태가 유용하다.

~~~text
Before
[스크린샷]

After
[스크린샷]

Expected Interaction
[GIF / 이미지]
~~~

특히 다음 상황에서 효과적이다.

- UI 변경
- Layout 문제
- Before / After
- Bug reproduction
- 예상 Interaction
- Rendering 결과

## 6. Reviewer 지정

리뷰 가능한 상태가 되면 담당 개발자를 Reviewer로 지정한다.

Draft 상태에서는 중간 피드백 용도로 사용하고, 완료되면 **Ready for Review**로 바꾼다.

## 7. Review Feedback 대응

~~~text
Feedback 확인
→ 실제 코드와 비교
→ 수정 여부 판단
→ 수정
→ Build/Test
→ Commit
→ Push
~~~

같은 Feature Branch에 Push하면 **기존 PR에 자동 반영**된다.

새 PR을 만들 필요는 없다.

## 8. 수정 후 Re-review 요청

큰 수정이 끝났다면 Comment로 처리 내용을 요약한다.

~~~text
Addressed:
- Save/Load handling
- Null state validation
- Camera ownership cleanup

Ready for re-review.
~~~

## 9. Merge 전 확인

~~~text
Review 완료
CI / Build 확인
Request Changes 해결
Conflict 없음
Base 최신 상태 확인
~~~

그 후 Repository 정책에 맞게 Merge한다.

## 10. Merge 후

~~~text
Merge 확인
→ Remote Branch 정리
→ Local Worktree 정리
→ Local Branch 삭제
~~~

---

# 협업자가 PR을 열었을 때 — Reviewer Workflow

Reviewer의 목적은 단순히 코드를 읽는 것이 아니라 **Merge 가능한 수준인지 판단하는 것**이다.

~~~mermaid
flowchart TD
    P[PR 도착] --> S[Summary / Background 확인]
    S --> D[Files Changed / Diff 확인]
    D --> R[Risk · Edge Case 검토]
    R --> T{실행 확인 필요?}
    T -->|Yes| L[Checkout / Build / Test]
    T -->|No| V[Review Decision]
    L --> V
    V --> C[Comment]
    V --> A[Approve]
    V --> X[Request Changes]
~~~

## 1. PR 목적부터 확인

먼저 확인한다.

- 왜 변경했는가
- 어떤 문제를 해결하는가
- Scope가 어디까지인가
- Known Issue가 있는가
- 어떤 부분을 집중해서 봐야 하는가

목적을 이해하지 않고 Diff부터 보면 구현의 옳고 그름을 판단하기 어렵다.

## 2. Commit과 Files Changed 확인

주요 검토 항목:

- 예상하지 않은 파일 변경
- 변경 범위가 지나치게 큰지
- 불필요한 Refactor가 섞였는지
- API / Data / Serialization 영향
- Error handling
- Edge Case
- Regression 가능성
- 테스트 누락

## 3. 필요한 경우 Branch를 직접 실행

코드만 보고 판단하기 어렵다면 Remote Branch를 가져온다.

~~~bash
git fetch origin
git switch --track origin/feature/camera
~~~

또는 별도 Worktree에서 확인한다.

UI·3D·DCC 기능은 실제 Interaction과 결과까지 확인해야 하는 경우가 많다.

## 4. Line Comment 남기기

Files changed에서 특정 Line에 Comment를 남긴다.

좋은 Comment는 다음 세 요소를 가진다.

~~~text
문제
+
왜 문제인지
+
가능하면 기대 방향
~~~

예:

> 이 상태는 Save/Load 후 복원되지 않을 가능성이 있습니다. Serialization 경로도 같이 확인해 주세요.

---

# Review 결과: Comment · Approve · Request Changes

| 선택 | 의미 | 언제 사용 |
|---|---|---|
| Comment | 의견만 전달 | 질문·제안이지만 Merge를 막을 정도는 아닐 때 |
| Approve | Merge 가능한 수준 | Blocking Issue가 없을 때 |
| Request Changes | 수정 필요 | Merge 전에 반드시 고쳐야 할 문제가 있을 때 |

## PR Approve 방법

GitHub 웹에서:

~~~text
PR 열기
→ Files changed
→ Review changes
→ Approve
→ Submit review
~~~

필요하면 Review Summary도 작성한다.

~~~text
Reviewed:
- Camera state ownership
- Save/Load
- Timeline interaction

No blocking issues found.
~~~

## Approve와 Merge는 다르다

~~~text
PR
↓
Review
↓
Approve
↓
Merge
~~~

**Approve**는:

> 이 변경은 Merge 가능한 수준이라고 판단했다.

라는 리뷰 결정이다.

**Merge**는 실제로 Head Branch의 변경을 Base Branch에 통합하는 별도 작업이다.

## 내가 만든 PR을 내가 Approve할 수 있는가?

GitHub에서는 **PR 작성자가 자신의 PR을 Approve할 수 없다.**

리뷰 승인이 필요한 Repository라면 다른 Reviewer의 승인이 필요하다.

---

# Request Changes 후 Workflow

Blocking Issue가 있다면 **Request Changes**를 선택한다.

~~~text
Reviewer
→ Request Changes

Author
→ 수정
→ Commit
→ Push

Reviewer
→ 변경 확인
→ Re-review
→ Approve
~~~

중요한 것은 Comment를 많이 남기는 것이 아니라 **무엇이 Merge를 막는 문제인지 명확히 구분하는 것**이다.

## Comment 예

~~~text
이 이름은 조금 더 명확하게 바꿔도 좋겠습니다.
~~~

개선 제안이지만 Merge를 막을 정도는 아니다.

## Request Changes 예

~~~text
이 코드에서는 Null Avatar에서 Crash가 발생합니다.
Merge 전에 처리해야 합니다.
~~~

반드시 해결해야 하는 문제다.

---

# 상대 개발자가 직접 개선해야 할 일이 많을 때

추천 흐름:

~~~text
내 Feature Branch
↓
Push
↓
Draft PR
↓
개발자 확인
├─ Comment
├─ 직접 Checkout
├─ 코드 수정
└─ 추가 Commit
↓
Ready for Review
↓
Final Review
↓
Approve
↓
Merge
~~~

작은 팀이고 같은 Branch에서 공동 작업하는 것이 허용된다면 협업자가 Feature Branch에 직접 Commit할 수도 있다.

변경 규모가 크거나 책임을 분리하고 싶다면 별도 Branch를 사용한다.

~~~text
feature/camera
        ↓
review/camera-fixes
        ↓
PR / Merge
        ↓
feature/camera
        ↓
Final PR
        ↓
stable
~~~

---

# PR 상태별 내가 해야 할 행동

| 상황 | 내 역할 | 권장 Action |
|---|---|---|
| 내가 구현 중 | Author | Push → Draft PR |
| 내가 구현 완료 | Author | Ready for Review → Reviewer 지정 |
| Reviewer가 질문 | Author | 답변 또는 수정 |
| Request Changes 받음 | Author | 수정 → Test → Push → Re-review 요청 |
| 다른 사람이 PR 생성 | Reviewer | 목적 → Diff → Test → Review |
| 사소한 의견만 있음 | Reviewer | Comment 또는 Approve + Comment |
| Blocking Issue 있음 | Reviewer | Request Changes |
| 문제 없음 | Reviewer | Approve |
| Approve 완료 | Maintainer | CI/Conflict 확인 후 Merge |
| Merge 완료 | Author/Maintainer | Branch / Worktree 정리 |

---

# 실무용 Checklist

## 내가 PR을 열 때

~~~text
[ ] 올바른 Feature Branch인가
[ ] Base Branch가 맞는가
[ ] 불필요한 파일이 포함되지 않았는가
[ ] Commit이 의미 단위로 정리됐는가
[ ] Summary / Background 작성
[ ] Review Needed 작성
[ ] Known Issues 작성
[ ] Build / Test 결과 기록
[ ] UI 변경이면 Screenshot 첨부
[ ] 작업 중이면 Draft PR
[ ] 완료되면 Ready for Review
~~~

## 다른 사람 PR을 리뷰할 때

~~~text
[ ] PR 목적을 이해했는가
[ ] Scope가 적절한가
[ ] Files Changed를 모두 확인했는가
[ ] API / Data / Serialization 영향 확인
[ ] Error / Edge Case 확인
[ ] 회귀 가능성 확인
[ ] 필요하면 직접 Build/Test
[ ] Blocking / Non-blocking 의견 구분
[ ] Comment / Approve / Request Changes 선택
[ ] 수정 후 Re-review
~~~

---

# 가장 단순한 기억법

~~~text
Push
= 보여준다

Draft PR
= 같이 만든다

PR
= 리뷰해 달라고 요청한다

Comment
= 의견을 남긴다

Request Changes
= 반드시 수정해야 한다

Approve
= Merge 가능한 수준이라고 판단한다

Merge
= 실제로 Base Branch에 넣는다
~~~

PR은 단순 코드 전송 수단이 아니라 **변경의 이유, 구현, 시각 자료, 토론, 검증, 승인, 통합을 한곳에 모으는 협업 기록**이다.

# Git 실전 작업 흐름 모음

## 1. Worktree A가 작업 중인데 급히 B를 시작

현재:

```text
Main WT → stable (clean)
WT A    → feature/a (uncommitted WIP)
```

A를 건드리지 않는다.

```bash
git fetch origin
git worktree add ../worktrees/b -b feature/b origin/stable
```

결과:

```text
Main WT → stable
WT A    → feature/a  WIP 그대로
WT B    → feature/b  최신 origin/stable 기반
```

자세히: 「Worktree 완전 이해」

## 2. 현재 Feature가 stable보다 73 Commit 뒤처짐

먼저 Remote 상태를 갱신한다.

```bash
git fetch origin
git log --oneline HEAD..origin/stable
```

개인 Feature Branch이고 History를 정리하고 싶다면:

```bash
git rebase origin/stable
```

공유 Branch라면 Merge가 더 안전한 경우가 많다.

```bash
git merge origin/stable
```

73이라는 숫자는 충돌 개수가 아니다. **변경 영역이 겹치는지**가 중요하다.

## 3. Local Commit이 있는데 Push하지 않음

다른 협업자는 일반적으로 볼 수 없다.

```text
Local
A ─ B ─ C

Remote
A ─ B
```

Push해야 공유된다.

## 4. Branch를 만들었는데 Push하지 않음

Remote에는 Branch가 없다.

첫 Push:

```bash
git push -u origin feature/a
```

자세히: 「협업 · Push · PR · Code Review」

## 5. 다른 개발자의 Remote Branch를 잠깐 보기

```bash
git fetch origin
git switch --detach origin/feature/a
```

수정까지 이어갈 거라면 Local Branch를 만든다.

자세히: 「HEAD · Checkout · Detached HEAD」

## 6. Merge / Rebase / Cherry-pick을 실행하기 전

항상 세 가지를 적어 본다.

```text
Current Branch:
Target:
Expected Result:
```

예:

```text
Current: feature/camera
Target: origin/stable
Operation: Rebase
Expected: 내 Feature Commit을 최신 stable 위에 다시 생성
```

이 습관만으로 방향 실수를 크게 줄일 수 있다.

## 7. PR 전 기본 체크

```text
git status
git fetch origin
branch / upstream 확인
commit 목록 확인
diff 확인
local build/test
push
PR
```

## 8. PR Review 후

같은 Feature Branch에서 수정 Commit을 Push하면 기존 PR에 자동 반영된다.

새 PR을 만들 필요가 없다.

## 9. Merge 후 정리

```text
PR Merge 확인
↓
Worktree clean 확인
↓
git worktree remove ...
↓
git branch -d ...
↓
git worktree prune
```

## 10. Claude Code에게 자연어로 지시

### 새 Feature

> 최신 origin/stable에서 feature/camera Branch와 별도 Worktree를 만들어. 현재 Session의 Branch와 Worktree는 변경하지 마.

Commit · Pull · Push · Rebase · Merge · Cherry-pick · PR 지시 예시는 「Claude Code를 Git Client처럼 쓰기」에 모아 두었다.

## 실전에서 기억할 핵심

```text
Repository
= Git 기록

Branch
= Commit을 가리키는 개발 흐름

HEAD
= 현재 Worktree의 위치

Worktree
= 실제 파일 작업 공간

Commit
= Local History 기록

Push
= Remote 공유

Fetch
= Remote 상태를 Local에 가져옴

PR
= 공식 Review / Integration 공간
```

Git은 명령어를 많이 외우는 도구가 아니라 **현재 어느 층을 바꾸고 있는지 이해하는 도구**다.
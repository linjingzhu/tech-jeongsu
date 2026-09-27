# Claude Code를 자연어 Git Client처럼 사용하기

Claude Code가 로컬 Repository와 Shell에 접근할 수 있다면 대부분의 Git 작업을 자연어로 지시할 수 있다.

예:

- commit
- fetch / pull / push
- branch / worktree
- merge / rebase / cherry-pick
- stash
- restore / revert
- diff / log / reflog
- PR 준비

## 기본 안전 루프

```mermaid
flowchart LR
    U[자연어 요청] --> S[현재 Git 상태 확인]
    S --> P[실행 계획 설명]
    P --> R{위험도}
    R -->|Low| X[실행]
    R -->|High| H[Human 승인]
    H --> X
    X --> V[결과 검증]
```

### 실행 전에 확인하면 좋은 것

```bash
git status
git branch --show-current
git remote -v
git log --oneline --decorate -10
```

## 자연어 예시

### Commit

> 현재 변경을 검토하고 서로 관련된 내용끼리 의미 단위로 commit해. 무관한 파일은 포함하지 마.

### Pull

> 현재 branch가 어떤 upstream을 추적하는지 확인하고, uncommitted change가 없는 경우에만 안전하게 최신화해.

### Push

> 현재 branch를 remote에 push해. 첫 push면 upstream도 연결해. force push는 하지 마.

### Rebase

> 현재 feature branch를 최신 origin/stable 위로 rebase해. 실행 전에 현재 branch와 base, 예상 history 변화를 설명하고 conflict가 나면 임의 해결하지 말고 보고해.

### Merge

> origin/stable을 현재 feature branch에 merge하려고 해. merge 방향과 merge commit 발생 가능성을 먼저 설명해.

### Cherry-pick

> abc123 commit의 변경만 현재 branch로 가져와. 먼저 git show로 내용과 선행 의존 commit 여부를 확인해.

### PR

> 현재 branch를 stable 대상으로 PR 준비해. commit 목록, diff, build/test 상태를 확인하고 Summary / Changes / Verification / Risk를 작성해.

## 위험도에 따른 권한

| 수준 | 예 | 운영 |
|---|---|---|
| 낮음 | status, diff, log, fetch | 자동 실행 가능 |
| 중간 | commit, push, merge, rebase, cherry-pick | 상태 확인 후 실행 |
| 높음 | reset --hard, force push, branch -D, clean -fdx | 명시적 승인 필요 |

## Fork 같은 GUI Git Client가 필요한가?

AI가 Git operator 역할을 맡으면 GUI Git Client의 필요성은 크게 줄어든다.

하지만 그래프나 diff를 빠르게 눈으로 보는 데는 여전히 유용하다.

```text
Claude Code
= Git Operator

Fork / SourceTree
= Git Visualizer / Inspector
```

즉 “조작은 자연어, 검증은 시각화” 조합이 실용적이다.

## 좋은 Git 지시문의 공통 형태

```text
1. 현재 상태를 먼저 확인해.
2. 내가 원하는 목표는 ___야.
3. 실행할 Git 명령과 방향을 설명해.
4. 파괴적 작업은 승인 전 실행하지 마.
5. conflict가 나면 자동 해결하지 말고 원인을 보고해.
6. 완료 후 branch / commit / remote 상태를 요약해.
```

AI에게 Git을 맡길수록 Git 개념을 몰라도 된다는 뜻은 아니다. 오히려 **결과를 검증할 수 있을 만큼 Merge, Rebase, HEAD, Remote 같은 개념을 이해하는 것이 중요하다.**
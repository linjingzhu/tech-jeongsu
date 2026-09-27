# HEAD, Checkout, Switch, Detached HEAD

## HEAD란?

HEAD는 **현재 Worktree의 현재 위치**를 나타내는 포인터다.

일반 상태:

```text
HEAD
 ↓
feature/camera
 ↓
Commit C
```

즉 HEAD는 Branch를 가리키고, Branch는 Commit을 가리킨다.

새 Commit:

```text
A ─ B ─ C ─ D
            ↑ feature/camera
            ↑ HEAD
```

## Checkout이란?

Checkout의 본질은:

> 특정 Commit의 파일 상태를 현재 Worktree에 펼치는 것

Branch를 바꾸면 다음이 함께 변한다.

- HEAD
- Index
- Worktree의 실제 파일

과거에는:

```bash
git checkout feature/camera
```

현재는 목적을 나눠 쓰는 편이 이해하기 쉽다.

```bash
git switch feature/camera      # branch 이동
git restore Camera.cpp         # 파일 복구
```

## Uncommitted Change가 있는데 Switch하면?

Git이 안전하게 유지할 수 있으면 변경사항을 그대로 들고 갈 수 있다.

하지만 대상 Branch의 파일과 충돌해 덮어쓸 가능성이 있으면 Git이 중단한다.

```text
Your local changes would be overwritten...
```

그때 선택지는:

- Commit
- Stash
- Restore로 변경 버리기

Worktree를 사용하는 이유 중 하나는 이런 Branch 이동 자체를 줄이는 것이다.

## Detached HEAD

일반:

```text
HEAD → feature/camera → Commit C
```

Detached:

```text
HEAD → Commit C
```

Branch를 거치지 않고 Commit을 직접 보고 있다.

용도:

- 과거 Commit 확인
- 특정 버전 Build
- 원격 Branch 상태 임시 확인
- 실험

예:

```bash
git fetch origin
git switch --detach origin/feature/avatar
```

이렇게 하면 Local Branch를 만들지 않고 다른 사람이 Push한 원격 Branch의 최신 상태를 확인할 수 있다.

수정해서 계속 개발하고 싶다면 Local Branch를 만드는 편이 맞다.

```bash
git switch -c feature/avatar --track origin/feature/avatar
```

## Detached HEAD가 모든 Branch를 동시에 본다는 뜻은 아니다

한 Worktree에는 언제나 하나의 HEAD만 있다.

다른 Branch 내용을 단순히 읽고 싶다면 Checkout하지 않고:

```bash
git show feature/a:Source/Camera.cpp
```

같이 볼 수도 있다.
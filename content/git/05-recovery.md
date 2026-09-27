# Stash, Restore, Revert, Discard, Reset

이 명령들은 모두 “되돌린다”는 느낌이 있지만 대상이 다르다.

## 전체 위치

```text
Working Tree
   ↓ git add
Staging Area
   ↓ git commit
Commit History
```

## Stash

미완성 변경을 **임시 보관하고 Working Tree를 깨끗하게** 만든다.

```bash
git stash push -m "Camera WIP"
git stash list
git stash pop
```

```text
Before
Camera.cpp modified
Scene.cpp modified

git stash

After
Working Tree clean
Stash에 변경 보관
```

짧은 작업 전환에는 편하지만 오래 보존할 중요한 작업이면 WIP Commit이 더 명확할 수 있다.

## Restore

아직 Commit되지 않은 변경을 되돌린다.

```bash
git restore Camera.cpp
```

Staging만 해제:

```bash
git restore --staged Camera.cpp
```

후자의 경우 파일 수정 내용은 남아 있다.

## Revert

이미 Commit된 변경의 효과를 취소하는 **새 Commit**을 만든다.

```text
A ─ B ─ C
        ↑ 잘못된 변경

git revert C

A ─ B ─ C ─ R
            ↑ C를 반대로 적용한 새 Commit
```

공유된 History에서 안전하게 되돌릴 때 유용하다.

## Discard

Git 공식 명령어라기보다 GUI에서 흔히 쓰는 표현이다.

“Discard Changes”는 보통 내부적으로 Working Tree 변경을 `restore`하는 의미다.

## Reset

Reset은 더 강력하다.

> Branch/HEAD가 가리키는 위치와 필요에 따라 Index/Working Tree까지 이동시킨다.

특히:

```bash
git reset --hard
```

는 미Commit 변경을 잃을 수 있으므로 파괴적이다.

## 한눈에 비교

| 기능 | 주 대상 | 새 Commit | 공유 History에 적합 |
|---|---|---:|---:|
| stash | 미완성 변경 임시 저장 | X | - |
| restore | Commit 전 파일 변경 | X | - |
| revert | 기존 Commit 효과 | O | O |
| discard | GUI의 변경 버리기 표현 | 보통 X | - |
| reset | HEAD/Branch/Index/파일 | X | 주의 |

기본 기억법:

> Commit 전 파일 변경 → **restore**  
> 잠시 치워두기 → **stash**  
> 이미 공유된 Commit 취소 → **revert**  
> History 자체를 움직이기 → **reset, 매우 주의**
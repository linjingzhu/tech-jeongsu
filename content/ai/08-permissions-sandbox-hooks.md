# 권한 · Sandbox · Hook: 강제 층 설계하기

> **학습 목표**: Claude Code의 권한 규칙과 permission mode, Codex의 approval policy와 sandbox mode를 구분해 설명할 수 있다. Hook의 입출력 계약으로 force push 차단과 미커밋 종료 방지를 직접 구현하고, 1인 스튜디오에 맞는 위험 등급별 권한을 설계할 수 있다.

「지시문과 메모리」가 다룬 권고 층은 agent가 *따르려고 노력하는* 것이다. 이 문서는 agent의 판단과 무관하게 harness가 실행하는 **강제 층**을 다룬다. 키 이름과 동작은 2026-09 기준 공식 문서와 openai/codex 소스로 확인했다.

## 핵심 개념

세 장치를 겹쳐 쓰는 이유는 빈틈이 서로 다르기 때문이다. 권한 규칙은 명령 **텍스트**를, sandbox는 **실제 시스템 호출**을, hook은 **맥락**(branch, git 상태)을 본다.

| 장치 | 무엇을 막는가 | 판단 기준 | 한계 |
|---|---|---|---|
| 권한 규칙 (allow · ask · deny) | 도구 호출 | 도구 이름과 인자 텍스트 | Bash는 같은 프로그램의 다른 표기로 빠져나갈 수 있다 |
| Permission mode · approval policy | 묻지 않고 실행할 범위 | 세션 전체 기본값 | 규칙이 mode 위에 얹힌다 |
| Sandbox | 파일시스템 · 네트워크 접근 | OS 수준 (Seatbelt, bubblewrap) | 대상이 셸 명령에 한정된다 |
| Hook | 생명주기 시점의 행동 | 직접 작성한 코드 | 코드가 보는 만큼만 막는다 |

## 원리

### Claude Code 권한 규칙

규칙은 **deny → ask → allow** 순서로 평가되고 처음 일치한 것이 결과를 정한다. 구체성은 순서를 바꾸지 못하므로 `Bash(aws *)` deny는 `Bash(aws s3 ls)` allow보다 항상 먼저다. 어느 scope의 deny든 다른 scope의 allow를 막는다.

| 규칙 | 의미 |
|---|---|
| `Bash(npm run *)` | `npm run`으로 시작하는 명령. `*`는 subcommand 뒤에 둔다 (`:*` 접미사도 같은 뜻) |
| `Read(./.env)`, `Edit(/src/**/*.ts)` | gitignore 문법. `/`는 settings 파일 기준, `//`는 절대 경로, `~/`는 홈 |
| `WebFetch(domain:*.example.com)` | 하위 도메인 fetch |
| `mcp__github__get_*` | 특정 MCP 서버의 도구들 |

Claude Code는 `&&`, `;`, `|`로 이어진 명령을 subcommand마다 검사하고 `timeout`, `nice` 같은 wrapper를 벗겨서 본다. 그래도 **Bash 규칙은 보안 경계가 아니다**. 공식 문서의 예로 `Bash(git push *)` deny는 `git -C . push origin main`을 막지 못한다. 또 커밋된 `.claude/settings.json`의 `allow`는 workspace trust를 수락한 뒤에 적용되고, `deny`와 `ask`는 즉시 적용된다.

### Permission mode

| Mode | 묻지 않고 실행하는 것 | 용도 |
|---|---|---|
| `default` (UI 표기 Manual) | 읽기만 | 민감한 작업 |
| `acceptEdits` | 읽기, 작업 디렉터리 파일 편집, `mkdir` · `mv` 같은 흔한 파일 명령 | 검토하며 반복 |
| `plan` | 읽기 (auto mode가 가능하면 classifier가 승인한 명령도) | 변경 전 탐색 |
| `auto` | 전부, 단 classifier가 배경에서 검사 | 긴 작업 |
| `dontAsk` | 사전 허용된 것만, 나머지는 거부 | CI, 스크립트 |
| `bypassPermissions` | 전부 | 격리된 container · VM 전용 |

`Shift+Tab`으로 순환하고 `--permission-mode`로 시작 mode를 정한다. `auto`와 `bypassPermissions`는 project · local 설정에서 기본값으로 지정할 수 없다. `.git`, `.claude`, `.husky`, `.mcp.json` 같은 **protected path** 쓰기는 원칙적으로 `bypassPermissions`에서만 자동 승인된다. deny 규칙은 모든 mode에서 막는다.

### Sandbox

Claude Code의 sandbox는 Bash · PowerShell · Monitor 명령과 자식 프로세스에 OS 경계를 씌운다. macOS는 Seatbelt, Linux · WSL2는 `bubblewrap`과 `socat`을 쓰며, `/sandbox`로 켜거나 설정에 적는다. 쓰기는 기본적으로 작업 디렉터리와 임시 디렉터리로 제한되지만 읽기는 넓으므로 `~/.ssh` 같은 경로는 직접 막는다. 아래의 `allowUnsandboxedCommands: false`는 sandbox 밖 재시도라는 탈출구를 닫는다. `autoAllowBashIfSandboxed` 기본값 때문에 sandbox 안의 Bash는 묻지 않고 실행되지만, `Bash(git push *)` 같은 내용 지정 ask 규칙과 deny 규칙은 여전히 적용된다.

```json
{
  "sandbox": {
    "enabled": true, "allowUnsandboxedCommands": false,
    "filesystem": { "denyRead": ["~/.ssh", "~/.aws"] },
    "network": { "allowedDomains": ["github.com", "registry.npmjs.org"] }
  }
}
```

### Codex: approval policy와 sandbox mode

| 키 | 값 | 의미 |
|---|---|---|
| `sandbox_mode` | `read-only` · `workspace-write` · `danger-full-access` | `workspace-write`의 네트워크는 기본 꺼짐 (`[sandbox_workspace_write] network_access`) |
| `approval_policy` | `on-request` (기본, `on-failure`는 별칭) | 모델이 필요할 때 승인을 요청 |
| `approval_policy` | `never` | 묻지 않는다. 실패는 모델에게 그대로 반환 |
| `approval_policy` | `{ granular = { … } }` | 범주별 허용 또는 자동 거절 |

이처럼 Codex는 **무엇을 할 수 있는가**(`sandbox_mode`)와 **언제 묻는가**(`approval_policy`)를 분리한다. `untrusted` 값은 2026-09 main 소스에서 "no longer supported" 오류를 낸다. CLI에서는 `-s`/`--sandbox`, `-a`/`--ask-for-approval`로 바꾸며, `--dangerously-bypass-approvals-and-sandbox`(별칭 `--yolo`)는 외부에서 이미 격리된 환경 전용이다. 명령 단위 규칙은 설정 폴더의 `rules/*.rules`(예: `~/.codex/rules/default.rules`)에 Starlark로 적는다. 예: `prefix_rule(pattern = ["git", "push", ["--force", "-f"]], decision = "forbidden")`. 이 규칙은 **앞에서부터** 토큰을 맞추므로 `git push origin --force`는 걸리지 않는다.

### Hook: 이벤트와 입출력 계약

Claude Code hook은 생명주기 이벤트에 실행되는 command · http · mcp_tool · prompt · agent 처리기다. 2026-09 기준 이벤트는 30개가 넘으며 자주 쓰는 것은 `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PermissionRequest`, `PostToolUse`, `Stop`, `SubagentStop`, `PreCompact`, `SessionEnd`다.

- **입력**: stdin JSON. 공통 필드 `session_id`, `transcript_path`, `cwd`, `permission_mode`, `hook_event_name`에 이벤트별 필드(`tool_name`, `tool_input`, `stop_hook_active` 등)가 붙는다.
- **Exit code**: 0은 성공이며 stdout JSON을 읽는다. 2는 차단이며 stderr가 사유로 Claude에게 간다. `PreToolUse`의 exit 2는 권한 규칙 평가 전에 호출을 멈춘다. **그 밖의 값은 대부분 non-blocking 오류라 행동이 그대로 진행된다.**
- **JSON 출력**: `PreToolUse`는 `hookSpecificOutput.permissionDecision`(`allow` · `deny` · `ask` · `defer`), `Stop`은 최상위 `"decision": "block"`과 `reason`을 쓴다. hook의 `allow`도 deny · ask 규칙을 넘지 못한다.

```mermaid
flowchart TD
    C[도구 호출 요청] --> H{PreToolUse Hook}
    H -->|exit 2| B[차단, 사유를 Claude에게 전달]
    H -->|통과| D{deny 규칙 일치}
    D -->|예| B
    D -->|아니오| A{ask 규칙 일치}
    A -->|예| Q[사람에게 확인]
    A -->|아니오| L{allow 규칙 또는 Mode가 허용}
    L -->|예| S[Sandbox 안에서 실행]
    L -->|아니오| Q
    Q -->|승인| S
    Q -->|거절| B
```

## 적용: 이 저장소의 설정

이 저장소는 역할 agent에 권한을 박아 두었다. Claude agent 두 개는 `tools: Read, Grep, Glob, Bash`와 `permissionMode: plan`, Codex agent 세 개는 `sandbox_mode = "read-only"`다. `.ai/HARNESS.md`는 parent runtime override가 파일의 sandbox 설정을 이길 수 있으니 실제 권한을 확인하라고 덧붙인다. 그러나 **커밋된 `.claude/settings.json`과 hook은 없다**. 아래는 이 빈칸을 채우는 초안이며, 테스트 명령은 이 저장소의 `node --test tests/*.test.cjs`다.

```json
{
  "permissions": {
    "allow": ["Bash(node --test *)", "Bash(python3 .ai/tools/check_policy_set.py)", "Bash(git diff *)", "Bash(git log *)", "Bash(git commit *)"],
    "ask": ["Bash(git push *)", "Bash(git reset --hard *)", "WebFetch"],
    "deny": ["Read(./.env)", "Read(./.env.*)", "Bash(git push --force *)", "Bash(git push -f *)"]
  },
  "hooks": {
    "PreToolUse": [{ "matcher": "Bash", "hooks": [{ "type": "command", "if": "Bash(git *)", "command": "bash \"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-force-push.sh" }] }],
    "Stop": [{ "hooks": [{ "type": "command", "command": "bash \"$CLAUDE_PROJECT_DIR\"/.claude/hooks/stop-if-dirty.sh" }] }]
  }
}
```

**Hook 1, force push 차단** (`.claude/hooks/block-force-push.sh`, `jq` 필요). deny 규칙이 놓치는 `git -C . push --force`, `git push origin +main` 같은 표기까지 본다.

```bash
CMD=$(jq -r '.tool_input.command // empty')
if printf '%s\n' "$CMD" | grep -Eq 'push.*(--force|[[:space:]]-f([[:space:]]|$)|[[:space:]]\+[^[:space:]])'; then
  echo "Blocked: force push is not allowed from an agent session. Ask the owner." >&2
  exit 2
fi
exit 0
```

**Hook 2, 미커밋 변경을 남긴 채 끝내지 않기** (`.claude/hooks/stop-if-dirty.sh`). exit 2가 종료를 막고 stderr가 다음 지시가 된다. `stop_hook_active`가 `true`이면 이미 한 번 되돌려 보낸 것이므로 종료를 허용한다. 이 검사가 없으면 Claude Code는 8번 연속 차단된 뒤에야 hook을 무시하고 멈춘다.

```bash
INPUT=$(cat)
if [ "$(printf '%s' "$INPUT" | jq -r '.stop_hook_active')" = "true" ]; then exit 0; fi
cd "$CLAUDE_PROJECT_DIR" || exit 0
if [ -n "$(git status --porcelain)" ]; then
  echo "Uncommitted changes remain. Commit them in meaningful units, or state in the report why they stay uncommitted." >&2
  exit 2
fi
exit 0
```

## 심화

### 1인 스튜디오의 위험 등급 설계

혼자 여러 제품을 운영하면 승인 요청이 많아지고, 많아지면 읽지 않고 승인하게 된다. 그래서 **위험 등급마다 장치를 하나씩** 정한다. 「Claude Code를 Git Client처럼 쓰기」의 안전 루프를 설정으로 옮긴 것이며, T3는 GitHub branch protection처럼 agent 바깥의 마지막 방어선까지 둔다.

| 등급 | 예 | Claude Code | Codex |
|---|---|---|---|
| T0 조회 | 읽기, 검색, `git diff` | 기본 허용 | `read-only` |
| T1 로컬 · 되돌릴 수 있음 | 편집, 테스트, 로컬 commit | `acceptEdits` 또는 allow + sandbox | `workspace-write` + `on-request` |
| T2 공유 상태 | push, PR, 의존성 설치, 네트워크 | ask | sandbox 밖 요청은 승인 |
| T3 비가역 · 외부 비용 | force push, 배포, 결제 API, 대량 삭제 | deny + hook + 사람 | `forbidden` 규칙 + 서버 쪽 보호 |

### Secrets 위생

- `.env*`, `~/.ssh`, `~/.aws`는 권한 deny와 sandbox `denyRead`에 **둘 다** 적는다. 권한 규칙은 Read 도구를, sandbox는 `cat` 같은 Bash 경로를 막는다. `.claude/settings.local.json`과 `CLAUDE.local.md`는 commit하지 않는다.
- 프로젝트 `.mcp.json`의 원격 `url` · `headers`에서는 `ANTHROPIC_API_KEY` 같은 자격 증명 변수가 빈 값으로 읽힌다. 남의 저장소가 내 key를 외부로 보내지 못하게 하는 장치다. Codex는 `shell_environment_policy`(`inherit`, `exclude`, `include_only`, `set`)로 명령에 전달할 환경 변수를 줄인다.

### 흔한 실패 모드

- **Hook이 조용히 통과시킨다**: 실행 권한이 없거나 `jq`가 없어 exit 1로 끝나면 non-blocking 오류라 행동이 진행된다. 차단 hook은 설치 직후 일부러 걸리는 입력으로 시험한다. 비슷하게 shell profile의 `echo`가 stdout 앞에 끼면 JSON 출력이 무시된다.
- **project allow가 먹지 않는다**: workspace trust 전이거나, trust 대화상자가 없는 `claude -p` 실행이다. Codex도 신뢰하지 않은 프로젝트의 `.codex/config.toml`은 비활성이다.

## 흔한 오해

- **"allow를 넓게 주고 deny로 위험한 것만 막으면 된다."** Bash deny는 표기만 바꿔도 빠져나간다. 넓은 allow에는 sandbox를 겹친다.
- **"bypassPermissions에서도 protected path는 보호된다."** 그 mode는 protected path 쓰기까지 허용한다. container 밖에서 쓰지 않는다.
- **"Codex의 `never`는 안전 모드다."** 묻지 않을 뿐이며, 안전은 `sandbox_mode`가 정한다.

## 자기 점검 질문

1. `Bash(git push *)`가 ask에, `Bash(git push origin main)`이 allow에 있다. `git push origin main`은 어떻게 처리되는가?
2. 차단 hook이 exit 1로 끝나면 어떤 일이 일어나며, 왜 위험한가?
3. Stop hook에서 `stop_hook_active`를 확인하지 않으면 어떻게 되는가?
4. Codex에서 `approval_policy = "never"`와 `sandbox_mode = "workspace-write"`를 함께 쓰면 무엇이 허용되고 무엇이 막히는가?
5. 위험 등급 T3의 작업을 agent 설정만으로 막으면 부족한 이유는 무엇인가?

## 참고 자료

- Claude Code, [Configure permissions](https://code.claude.com/docs/en/permissions) · [Permission modes](https://code.claude.com/docs/en/permission-modes) · [Sandboxing](https://code.claude.com/docs/en/sandboxing) (2026-09-29 확인)
- Claude Code, [Hooks reference](https://code.claude.com/docs/en/hooks) · [Hooks guide](https://code.claude.com/docs/en/hooks-guide) (2026-09-29 확인)
- OpenAI Codex, [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security) · [Sandbox](https://developers.openai.com/codex/concepts/sandboxing) (2026-09-29, 소스 `protocol.rs`, `config.schema.json`, `execpolicy/README.md`로 교차 확인)
- 이 저장소: `.ai/HARNESS.md`, `.claude/agents/*.md`, `.codex/agents/*.toml`

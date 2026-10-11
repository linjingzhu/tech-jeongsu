# Practical Git Workflows

## 1. Start B Urgently While Worktree A Is Still in Progress

Current state:

```text
Main WT → stable (clean)
WT A    → feature/a (uncommitted WIP)
```

Leave A untouched.

```bash
git fetch origin
git worktree add ../worktrees/b -b feature/b origin/stable
```

Result:

```text
Main WT → stable
WT A    → feature/a  WIP unchanged
WT B    → feature/b  Based on the latest origin/stable
```

Details: "Understanding worktrees"

## 2. Your Current Feature Is 73 Commits Behind stable

First update your view of the remote state.

```bash
git fetch origin
git log --oneline HEAD..origin/stable
```

If this is a personal feature branch and you want to tidy its history:

```bash
git rebase origin/stable
```

For a shared branch, merge is often safer.

```bash
git merge origin/stable
```

The number 73 is not a conflict count. What matters is **whether the changed areas overlap**.

## 3. Local Commits Have Not Been Pushed

Other collaborators generally cannot see them.

```text
Local
A ─ B ─ C

Remote
A ─ B
```

A push is required to share them.

## 4. A Branch Has Been Created but Not Pushed

The branch does not exist on the remote.

First push:

```bash
git push -u origin feature/a
```

Details: "Collaboration · PR · Code review"

## 5. Briefly Inspect Another Developer’s Remote Branch

```bash
git fetch origin
git switch --detach origin/feature/a
```

Create a local branch if you intend to continue by making changes.

Details: "HEAD · Checkout · Detached HEAD"

## 6. Before Running Merge / Rebase / Cherry-pick

Always write down three things.

```text
Current Branch:
Target:
Expected Result:
```

Example:

```text
Current: feature/camera
Target: origin/stable
Operation: Rebase
Expected: Recreate my feature commits on top of the latest stable
```

This habit alone can greatly reduce mistakes in direction.

## 7. Basic Checks Before a PR

```text
git status
git fetch origin
Check branch / upstream
Check the commit list
Inspect the diff
local build/test
push
PR
```

## 8. After PR Review

Pushing revision commits to the same feature branch automatically updates the existing PR.

There is no need to create a new PR.

## 9. Cleanup After Merging

```text
Confirm the PR has merged
↓
Confirm the worktree is clean
↓
git worktree remove ...
↓
git branch -d ...
↓
git worktree prune
```

## 10. Give Claude Code Natural-Language Instructions

### New Feature

> Create a feature/camera branch and a separate worktree from the latest origin/stable. Do not change the current session’s branch or worktree.

Example instructions for commit, pull, push, rebase, merge, cherry-pick and PRs are collected in "Claude Code as a Git client".

## Key Concepts to Remember in Practice

```text
Repository
= Git records

Branch
= A line of development pointing to a commit

HEAD
= The current worktree’s position

Worktree
= A workspace of actual files

Commit
= A record in local history

Push
= Sharing with the remote

Fetch
= Bringing the remote state into the local repository

PR
= A space for formal review / integration
```

Git is not about memorizing many commands; it is about **understanding which layer you are changing**.

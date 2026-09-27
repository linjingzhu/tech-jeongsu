# HEAD, Checkout, Switch, Detached HEAD

## What Is HEAD?

HEAD is a pointer representing **the current position of the current worktree**.

Normal state:

```text
HEAD
 ↓
feature/camera
 ↓
Commit C
```

In other words, HEAD points to a branch, and the branch points to a commit.

A new commit:

```text
A ─ B ─ C ─ D
            ↑ feature/camera
            ↑ HEAD
```

## What Is Checkout?

The essence of checkout is:

> Materializing the file state of a particular commit in the current worktree

Changing branches changes the following together.

- HEAD
- Index
- Actual files in the worktree

Historically:

```bash
git checkout feature/camera
```

Today, separating the commands by purpose makes them easier to understand.

```bash
git switch feature/camera      # Switch branches
git restore Camera.cpp         # Restore a file
```

## What Happens When You Switch with Uncommitted Changes?

If Git can preserve them safely, your changes can come along with you.

However, Git stops if the changes conflict with files on the target branch and could be overwritten.

```text
Your local changes would be overwritten...
```

Your options at that point are:

- Commit
- Stash
- Discard changes with restore

One reason to use worktrees is to reduce the need for these branch switches.

## Detached HEAD

Normal:

```text
HEAD → feature/camera → Commit C
```

Detached:

```text
HEAD → Commit C
```

You are looking directly at a commit without going through a branch.

Uses:

- Inspect an older commit
- Build a specific version
- Temporarily inspect a remote branch’s state
- Experiment

Example:

```bash
git fetch origin
git switch --detach origin/feature/avatar
```

This lets you inspect the latest state of a remote branch pushed by someone else without creating a local branch.

If you want to make changes and continue development, create a local branch.

```bash
git switch -c feature/avatar --track origin/feature/avatar
```

## Detached HEAD Does Not Mean Viewing All Branches at Once

A worktree always has exactly one HEAD.

To simply read content on another branch, you can avoid checkout with:

```bash
git show feature/a:Source/Camera.cpp
```

This also lets you inspect the file.

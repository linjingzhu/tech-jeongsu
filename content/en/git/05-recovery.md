# Stash, Restore, Revert, Discard, Reset

These commands all suggest “undoing,” but they operate on different targets.

## Where They Fit

```text
Working Tree
   ↓ git add
Staging Area
   ↓ git commit
Commit History
```

## Stash

**Temporarily store unfinished changes and clean the working tree.**

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
Changes stored in the stash
```

This is convenient for brief task switches, but a WIP commit may be clearer for important work that needs to be preserved longer.

## Restore

Undo changes that have not yet been committed.

```bash
git restore Camera.cpp
```

Unstage only:

```bash
git restore --staged Camera.cpp
```

In the latter case, the file modifications remain.

## Revert

Create a **new commit** that cancels the effect of an existing commit.

```text
A ─ B ─ C
        ↑ Incorrect change

git revert C

A ─ B ─ C ─ R
            ↑ New commit applying the inverse of C
```

This is useful for safely undoing changes in shared history.

## Discard

This is a common GUI term rather than an official Git command.

“Discard Changes” usually means internally using `restore` to undo working-tree changes.

## Reset

Reset is more powerful.

> Move the position pointed to by the branch/HEAD and, depending on the mode, update the index/working tree as well.

In particular:

```bash
git reset --hard
```

This is destructive because uncommitted changes can be lost.

## Comparison at a Glance

| Operation | Main Target | New Commit | Suitable for Shared History |
|---|---|---:|---:|
| stash | Temporary storage of unfinished changes | No | - |
| restore | File changes before a commit | No | - |
| revert | The effect of an existing commit | Yes | Yes |
| discard | GUI term for discarding changes | Usually no | - |
| reset | HEAD/branch/index/files | No | Caution |

A basic memory aid:

> File changes before a commit → **restore**  
> Set changes aside temporarily → **stash**  
> Undo an already shared commit → **revert**  
> Move history itself → **reset, with great care**
